package main

import (
    "context"
    "flag"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "path/filepath"
    "syscall"
    "time"

    ".webserver/middleware"
    "github.com/gin-gonic/gin"
)

var public string
var port string

func init() {
    flag.StringVar(&public, "public", "./dist", "path of static files")
    flag.StringVar(&port, "port", "8080", "service port")
    flag.Parse()
}

func middlewareNotFound(c *gin.Context) {
    c.File(filepath.Join(public, "404.html"))
    c.Abort()
}

func main() {

    gin.SetMode(gin.ReleaseMode)

    router := gin.New()

    router.NoRoute(middleware.Serve("/", middleware.LocalFile(public, true)), middlewareNotFound)

    webServer := &http.Server{
        Addr:         fmt.Sprintf(":%s", port),
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout:  120 * time.Second,
        Handler:      router,
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
