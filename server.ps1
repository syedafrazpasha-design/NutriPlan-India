$port = 8000
$ip = [System.Net.IPAddress]::Any
$listener = [System.Net.Sockets.TcpListener]::new($ip, $port)
$listener.Start()
Write-Output "Listening on port $port"
while($true) {
    if ($listener.Pending()) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = [System.IO.StreamReader]::new($stream)
        
        # Read the request line with timeout
        $client.ReceiveTimeout = 1000
        try {
            $req = $reader.ReadLine()
            if($req -match "GET (.*) HTTP") {
                $path = $matches[1]
                if($path -eq "/") { $path = "/index.html" }
                $path = $path.Replace("..", "").Split('?')[0]
                $localPath = Join-Path (Get-Location) $path.Replace("/", "\")
                
                $writer = [System.IO.StreamWriter]::new($stream)
                if(Test-Path $localPath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                    $mime = "text/plain"
                    if($ext -eq ".html") { $mime = "text/html" }
                    elseif($ext -eq ".css") { $mime = "text/css" }
                    elseif($ext -eq ".js") { $mime = "application/javascript" }
                    elseif($ext -eq ".png") { $mime = "image/png" }
                    elseif($ext -eq ".jpg") { $mime = "image/jpeg" }
                    
                    $writer.WriteLine("HTTP/1.1 200 OK")
                    $writer.WriteLine("Content-Type: $mime")
                    $writer.WriteLine("Access-Control-Allow-Origin: *")
                    $writer.WriteLine("Connection: close")
                    $writer.WriteLine("")
                    $writer.Flush()
                    
                    $fileStream = [System.IO.File]::OpenRead($localPath)
                    $fileStream.CopyTo($stream)
                    $fileStream.Close()
                } else {
                    $writer.WriteLine("HTTP/1.1 404 Not Found")
                    $writer.WriteLine("Connection: close")
                    $writer.WriteLine("")
                    $writer.Flush()
                }
            }
        } catch {
            # Ignore read errors
        }
        $client.Close()
    } else {
        Start-Sleep -Milliseconds 50
    }
}
