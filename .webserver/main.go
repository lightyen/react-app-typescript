package main

import (
    "context"
    "flag"
    "fmt"
    "net/http"
    "net/url"
    "os"
    "os/signal"
    "path/filepath"
    "syscall"
    "time"
)

type myRouter struct {
    staticSrc string
}

func (m *myRouter) ServeHTTP(w http.ResponseWriter, r *http.Request) {

    url, err := url.ParseRequestURI(r.RequestURI)

    if err != nil {
        http.ServeFile(w, r, filepath.Join(m.staticSrc, "404.html"))
        return
    }

    if url.Path == "/404" {
        http.ServeFile(w, r, filepath.Join(m.staticSrc, "404.html"))
        return
    }

    src := filepath.Join(m.staticSrc, url.Path)

    fileInfo, err := os.Stat(src)

    if err != nil {
        http.Redirect(w, r, "/404", http.StatusMovedPermanently)
        return
    }

    if fileInfo.IsDir() {
        s := filepath.Join(src, "index.html")
        _, err := os.Stat(s)
        if err != nil {
            http.Redirect(w, r, "/404", http.StatusMovedPermanently)
            return
        }
        http.ServeFile(w, r, s)
        return
    }

    http.ServeFile(w, r, src)
}

var public string
var port string

func init() {
    flag.StringVar(&public, "public", "./dist", "path of static files")
    flag.StringVar(&port, "port", "8080", "service port")
    flag.Parse()
}

func main() {
    // public, _ := filepath.Abs(public)
    //fileServer := http.FileServer(http.Dir(public))

    webServer := &http.Server{
        Addr:         fmt.Sprintf(":%s", port),
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout:  120 * time.Second,
        Handler:      &myRouter{staticSrc: public},
    }

    stop := make(chan os.Signal)
    signal.Notify(stop, os.Interrupt, os.Kill, syscall.SIGTERM)

    go func() {
        fmt.Printf("public path: %s\n", public)
        fmt.Printf("Listen: http://localhost%s\n", webServer.Addr)

        err := webServer.ListenAndServe()

        if err != nil && err != http.ErrServerClosed {
            fmt.Printf("ListenAndServe: %s", err)
            stop <- os.Interrupt
        }
    }()

    <-stop

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    webServer.Shutdown(ctx)
}
