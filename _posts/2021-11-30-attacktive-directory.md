---
title: "tryhackme: attacktive directory"
share: false
excerpt: "El 99% de las redes corporativas funcionan con AD. "
share: false
header:
  teaser:  /assets/images/kenobi/logo.jpg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - attacktive directory
  - enum4linux
  - kerbeos
---

## Comprovamos que la maquina este iniciada correctamente enviandole un *ping*

```bash
❯ ping -c 1 10.10.170.66
PING 10.10.170.66 (10.10.170.66) 56(84) bytes of data.
64 bytes from 10.10.170.66: icmp_seq=1 ttl=127 time=157 ms

--- 10.10.170.66 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 157.244/157.244/157.244/0.000 ms
```

Como podemos ver, recibio el paquete enviado, ademas, mediante el *ttl* podemos saber que es una maquina  _windows_
tambien podemos usar la utilidad _wichSystem.py_ 

```bash
❯ wichSystem.py 10.10.170.66

10.10.170.66 (ttl -> 127): Windows
```

## Enumeration

Iniciamos el escaneo verificando los puertos abiertos

```bash
> sudo nmap -p- --open --min-rate 5000 -sS -Pn -n 10.10.170.66 -oG allPorts
[sudo] password for blanco: 
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-30 22:01 -05
Nmap scan report for 10.10.170.66
Host is up (0.59s latency).
Not shown: 38185 closed tcp ports (reset), 27326 filtered tcp ports (no-response)
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT      STATE SERVICE
53/tcp    open  domain
80/tcp    open  http
88/tcp    open  kerberos-sec
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
389/tcp   open  ldap
445/tcp   open  microsoft-ds
464/tcp   open  kpasswd5
593/tcp   open  http-rpc-epmap
636/tcp   open  ldapssl
3268/tcp  open  globalcatLDAP
3269/tcp  open  globalcatLDAPssl
3389/tcp  open  ms-wbt-server
5985/tcp  open  wsman
9389/tcp  open  adws
47001/tcp open  winrm
49664/tcp open  unknown
49665/tcp open  unknown
49666/tcp open  unknown
49672/tcp open  unknown
49675/tcp open  unknown
49684/tcp open  unknown
49694/tcp open  unknown
49700/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 274.35 seconds
```

con la utilidad _extractPorts_ vemos un poco mejor los puertos abiertos y nos los copia en la clipboard

```bash
❯ extractPorts allPorts
───────┬───────────────────────────────────────────────────────────────────────────────────────────
       │ File: extractPorts.tmp
───────┼───────────────────────────────────────────────────────────────────────────────────────────
   1   │ 
   2   │ [*] Extracting information...
   3   │ 
   4   │     [*] IP Address: 10.10.170.66
   5   │     [*] Open ports: 53,80,88,135,139,389,445,464,593,636,3268,3269,3389,5985,9389,47001,49664,49665,49666,49672,49675,49684,4
       │ 9694,49700
   6   │ 
   7   │ [*] Ports copied to clipboard
   8   │ 
───────┴─────────────────────────────────
```
Ahora pasamos a verificar que serivicios corren en cada puerto y posibles vulnerabilidades

```bash
❯ sudo nmap -sV -sC -p53,80,88,135,139,389,445,464,593,636,3268,3269,3389,5985,9389,47001,49664,49665,49666,49672,49675,49684,49694,49700 10.10.170.66 -oN targeted
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-30 22:12 -05
Nmap scan report for 10.10.170.66
Host is up (0.18s latency).

PORT      STATE SERVICE       VERSION
53/tcp    open  domain        Simple DNS Plus
80/tcp    open  http          Microsoft IIS httpd 10.0
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
| http-methods: 
|_  Potentially risky methods: TRACE
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos (server time: 2021-12-01 03:12:58Z)
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP (Domain: spookysec.local0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: spookysec.local0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
| ssl-cert: Subject: commonName=AttacktiveDirectory.spookysec.local
| Not valid before: 2021-11-30T02:52:27
|_Not valid after:  2022-06-01T02:52:27
|_ssl-date: 2021-12-01T03:14:01+00:00; -2s from scanner time.
| rdp-ntlm-info: 
|   Target_Name: THM-AD
|   NetBIOS_Domain_Name: THM-AD
|   NetBIOS_Computer_Name: ATTACKTIVEDIREC
|   DNS_Domain_Name: spookysec.local
|   DNS_Computer_Name: AttacktiveDirectory.spookysec.local
|   Product_Version: 10.0.17763
|_  System_Time: 2021-12-01T03:13:50+00:00
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        .NET Message Framing
47001/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
49664/tcp open  msrpc         Microsoft Windows RPC
49665/tcp open  msrpc         Microsoft Windows RPC
49666/tcp open  msrpc         Microsoft Windows RPC
49672/tcp open  msrpc         Microsoft Windows RPC
49675/tcp open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
49684/tcp open  msrpc         Microsoft Windows RPC
49694/tcp open  msrpc         Microsoft Windows RPC
49700/tcp open  msrpc         Microsoft Windows RPC
Service Info: Host: ATTACKTIVEDIREC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: -2s, deviation: 0s, median: -2s
| smb2-time: 
|   date: 2021-12-01T03:13:53
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled and required

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 78.61 seconds
```
> What tool will allow us to enumerate port 139/445?  
> enum4linux

> What is the NetBIOS-Domain Name of the machine?  
> THM-AD

> What invalid TLD do people commonly use for their Active Directory Domain?  
> .local

## Enum4linux es una herramienta para enumerara información de sistemas windows y Samba

la _flag_ -a Haga todas las enumeraciones simples (-U -S -G -P -r -o -n -i). 
Esta opción está habilitada si no proporciona ninguna otra opción. 

```bash

```
