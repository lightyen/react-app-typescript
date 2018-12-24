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
		return
	}

	src := filepath.Join(m.staticSrc, url.Path)

	switch url.Path {
	case "/":
		http.ServeFile(w, r, src)
	case "/404":
		http.ServeFile(w, r, filepath.Join(m.staticSrc, "404.html"))
	default:
		fileInfo, err := os.Stat(src)
		if err != nil || fileInfo.IsDir() {
			http.Redirect(w, r, "/404", http.StatusMovedPermanently)
			// http.Redirect(w, r, "/", http.StatusMovedPermanently)
		} else {
			http.ServeFile(w, r, src)
		}
	}
}

var public string
var port string

func init() {
	flag.StringVar(&public, "public", "./dist", "path of static files")
	flag.StringVar(&port, "port", "9527", "service port")
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
