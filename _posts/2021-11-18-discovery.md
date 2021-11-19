---
title: "tryhackme: Content Discovery"
share: false
excerpt: "El mejor metodo de aprendizaje es practicando"
share: false
header:
  teaser:  /assets/images/discovery/logo.png
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - Gobuster
  - Robots.txt
---


### iniciamos 

Realizamos un primer escaneo con *nmap* para ver los puertos abiertos e iniciar a "jugar" con la maquina

```bash
❯ sudo nmap --open --min-rate 5000 -sS -Pn -n 10.10.234.170 -oG allPorts
[sudo] password for blanco: 
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-18 07:43 -05
Nmap scan report for 10.10.234.170
Host is up (0.17s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
9999/tcp open  abyss

Nmap done: 1 IP address (1 host up) scanned in 1.21 seconds
```
usamos la utilidad *extractPorts* para ver el escaneo mejor y copiar los puertos con la clipboard

```bash
> extractPorts allPorts
   1   │ 
   2   │ [*] Extracting information...
   3   │ 
   4   │     [*] IP Address: 10.10.234.170
   5   │     [*] Open ports: 22,80,9999
   6   │ 
   7   │ [*] Ports copied to clipboard
   8   │ 
```
Hacemos un escaneo de los puertos buscando encontrar los servicios que corren en ellos y posibles vulnerabilidades

```bash
❯ sudo nmap -sC -sV -p22,80,9999 10.10.234.170 -oN targeted
[sudo] password for blanco: 
Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-18 08:17 -05
Nmap scan report for 10.10.234.170
Host is up (0.58s latency).

PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 24:9a:44:23:9d:ab:2a:85:0e:25:b9:62:ae:87:d0:49 (RSA)
|   256 54:c0:1f:36:ee:56:c2:39:44:4f:6c:f0:29:a4:76:d2 (ECDSA)
|_  256 1a:7d:d2:6f:b7:1f:fc:8b:05:63:10:b6:e9:42:70:96 (ED25519)
80/tcp   open  http    nginx 1.18.0 (Ubuntu)
| http-robots.txt: 1 disallowed entry 
|_/staff-portal
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Acme IT Support - Home
9999/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
|_http-server-header: nginx/1.18.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.13 seconds
```


### Vamos respondiendo las preguntas mientras "jugamos" con la maquina

## What Is Content Discovery? 

> What is the Content Discovery method that begins with M?  
> Manually

> What is the Content Discovery method that begins with A?  
> Automated

> What is the Content Discovery method that begins with O?  
> Osint

## Manual Discovery - Robots.txt 

en la _url_ solo agregamos _robots.txt_ y encontramos *robots.txt*

![robots.txt](/assets/images/discovery/robots.png)

> What is the directory in the robots.txt that isn't allowed to be viewed by web crawlers?  
> /staff-portal

## Manual Discovery - Favicon 

> What framework did the favicon belong to?  
> cgiirc

```bash
❯ curl https://static-labs.tryhackme.cloud/sites/favicon/images/favicon.ico | md5sum
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1406  100  1406    0     0   2301      0 --:--:-- --:--:-- --:--:--  2297
f276b19aabcb4ae8cda4d22625c6735f  -
```

## Manual Discovery - Sitemap.xml 

![sitemap](/assets/images/discovery/sitemap.png)

>What is the path of the secret area that can be found in the sitemap.xml file?  
> /s3cr3t-area

## Manual Discovery - HTTP Headers 

```bash
❯ curl http://10.10.234.170 -v
*   Trying 10.10.234.170:80...
* Connected to 10.10.234.170 (10.10.234.170) port 80 (#0)
> GET / HTTP/1.1
> Host: 10.10.234.170
> User-Agent: curl/7.74.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: nginx/1.18.0 (Ubuntu)
< Date: Thu, 18 Nov 2021 13:47:57 GMT
< Content-Type: text/html; charset=UTF-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< X-FLAG: THM{xxxxxxxxxxx}
```
> What is the flag value from the X-FLAG header?  
> THM{HEADER_FLAG}

## Manual Discovery - Framework Stack 

![login](/assets/images/discovery/login.png)

> What is the flag from the framework's administration portal?  
> THM{CHANGE_DEFAULT_CREDENTIALS}

## OSINT - Google Hacking / Dorking 


|Filter		|Example		|Description|
|---------------|-----------------------|-------------|
|site		|site:tryhackme.com	|returns results only from the specified website address|
|inurl		|inurl:admin		|returns results that have the specified word in the URL|
|filetype	|filetype:pdf		|returns results which are a particular file extension|
|intitle	|intitle:admin		|returns results that contain the specified word in the title|


> What Google dork operator can be used to only show results from a particular site  
> site:

## OSINT - Wappalyzer 

- Basicamente es una extención que permite identificar que tecnologias usa un sitio web

> What online tool can be used to identify what technologies a website is running?  
> wappalyzer

## OSINT - Wayback Machine 

> What is the website address for the Wayback Machine?  
> https://archive.org/web

##  OSINT - GitHub 

> What is Git?  
> version control system 

## OSINT - S3 Buckets 

> What URL format do Amazon S3 buckets end in?  
> .s3.amazonaws.com

## Automated Discovery 

![gobuster](/assets/images/discovery/gobuster.png)

> What is the name of the directory beginning "/mo...." that was discovered?  
> /monthly

> What is the name of the log file that was discovered?  
> /development.log
