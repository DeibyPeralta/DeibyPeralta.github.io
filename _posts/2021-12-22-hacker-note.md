---
 title: "tryhackme: HackerNote"
 share: false
 excerpt: "Una aplicación web personalizada que presenta la enumeración de nombres de usuario, listas de palabras personalizadas y un exploit básico de escalada de privilegios. "
 share: false
 header:
   teaser:  /assets/images/hackerNote/logo.jpg
   teaser_home_page: true
 categories:
   - tryhackme
 tags:
   - web
   - exploit
   - escalate
---

# 1. Escaneo de puertos

Lo primero que haremos ser un *ping -c 1* al _ip_ y ver si nuestra maquina ya esta activa

```bash
❯ ping -c 1 10.10.94.166
PING 10.10.94.166 (10.10.94.166) 56(84) bytes of data.
64 bytes from 10.10.94.166: icmp_seq=1 ttl=63 time=536 ms

--- 10.10.94.166 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 535.998/535.998/535.998/0.000 ms
```

usamos *wichSystem.py* (utilidad desarrollada por @s4vitar) para ver con que clase de maquina estamos trabajando

```bash
❯ wichSystem.py 10.10.94.166

10.10.94.166 (ttl -> 63): Linux
```

- Ahora realizamos un primer escaneo de puertos usando la *nmap*

![allPorts](/assets/images/hackerNote/allPorts.png)

- vemos los puertos un poco "mejor" con la utilidad *extractPorts*, y copiamos los puertos en la clipboard para ejecutar otro analisis

![extractPorts](/assets/images/hackerNote/extractPorts.png)

- Mientras temina el analisis vamos ganando tiempo, verificando otro posible vector de ataque

![targeted](/assets/images/hackerNote/targeted.png)

- Vemos que existe el puerto *80* esta corriento, lo cual significa que existe una pagina web, la vemos

![server](/assets/images/hackerNote/server.png)

- No vemos nada relevante al momento, verificamos el *login*

![login](/assets/images/hackerNote/login.png)

iniciamos sesion con las credenciales del nuestro usuario y vemos que podemos crear una nota

![notes](/assets/images/hackerNote/notes.png)
