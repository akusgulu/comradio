%include "EnvVar.liq"

def f1(p)
response = http.get("#{backend_url}/nextsong")
log(response)
end

def f2(f,p)
response = http.get("#{backend_url}/nextsong")
log(response)
end

def f3(metadata)
  response = http.post(
    headers=[("Content-Type", "application/json")],
    data=json.stringify(metadata),
    timeout=1,
    "#{backend_url}/info"
  )
  log(response)
end

nextsong = playlist(mode="normal", reload_mode="watch",loop=false, playlist_path)

source.on_end(nextsong,f2)

sec = single(fallback_path)
source.on_track(sec,f1)

jingle = single(jingle_path)

radio = nextsong
radio = fallback(track_sensitive=false,[radio,sec])
radio = random(weights=[1,5],[jingle,radio])

source.on_metadata(radio,f3)

output.icecast(%mp3,
     host = radio_url, port = 8000,
     password = radio_passw, mount = "live",
     radio)