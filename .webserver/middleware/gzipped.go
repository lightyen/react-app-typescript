package middleware

import (
    "net/http"
    "os"
    "path"
    "path/filepath"
    "strings"

    "github.com/gin-gonic/gin"
)

const INDEX = "index.html"

var acceptMap = map[string]string{
    ".js":  "application/javascript",
    ".css": "text/css",
    ".ico": "image/vnd.microsoft.icon",
}

type ServeFileSystem interface {
    http.FileSystem
    Exists(prefix string, path string) bool
}

type localFileSystem struct {
    http.FileSystem
    root    string
    indexes bool
}

func LocalFile(root string, indexes bool) *localFileSystem {
    return &localFileSystem{
        FileSystem: gin.Dir(root, indexes),
        root:       root,
        indexes:    indexes,
    }
}

func (l *localFileSystem) Exists(prefix string, filepath string) bool {
    if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
        name := path.Join(l.root, p)
        stats, err := os.Stat(name)
        if err != nil {
            return false
        }
        if stats.IsDir() {
            if !l.indexes {
                index := path.Join(name, INDEX)
                _, err := os.Stat(index)
                if err != nil {
                    return false
                }
            }
        }
        return true
    }
    return false
}

func ServeRoot(urlPrefix, root string) gin.HandlerFunc {
    return Serve(urlPrefix, LocalFile(root, false))
}

func Serve(urlPrefix string, fs ServeFileSystem) gin.HandlerFunc {
    fileserver := http.FileServer(fs)
    if urlPrefix != "" {
        fileserver = http.StripPrefix(urlPrefix, fileserver)
    }
    return func(c *gin.Context) {
        if strings.Contains(c.Request.Header.Get("Accept-Encoding"), "gzip") {
            ext := filepath.Ext(c.Request.URL.Path)
            if v, ok := acceptMap[ext]; ok {
                filegz := c.Request.URL.Path + ".gz"
                if fs.Exists(urlPrefix, filegz) {
                    c.Header("Content-Type", v)
                    c.Header("Content-Encoding", "gzip")
                    c.Header("Vary", "Accept-Encoding")
                    c.Request.URL.Path += ".gz"
                    fileserver.ServeHTTP(c.Writer, c.Request)
                    c.Abort()
                    return
                }
            }
        }

        if fs.Exists(urlPrefix, c.Request.URL.Path) {
            fileserver.ServeHTTP(c.Writer, c.Request)
            c.Abort()
        }
    }
}
