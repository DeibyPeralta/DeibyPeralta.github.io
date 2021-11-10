---
title: "tryhackme: vulnversity"
share: false
excerpt: "El mejor metodo de aprendizaje es practicando"
share: false
header:
  teaser:  /assets/images/vulnversity/logo.jpg
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
