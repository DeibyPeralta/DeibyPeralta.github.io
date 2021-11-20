var store = [{
        "title": "Bandit0: Bash para principiantes - 2da parte",
        "excerpt":"Continuando con la maquina bandit 13 –&gt; 14 bandit 13 –&gt; 14 The password for the next level is stored in /etc/bandit_pass/bandit14 and can only be read by user bandit14. For this level, you don’t get the next password, but you get a private SSH key that can be used...","categories": ["Bash","Bandit"],
        "tags": ["bash","scripting"],
        "url": "http://localhost:4000/second-bandit0/",
        "teaser":"http://localhost:4000/assets/images/bandit0/bash-logo.jpg"},{
        "title": "Bandit0: Bash para principiantes",
        "excerpt":"En este post obtendremos las flags de la maquina bandit que se encuentra en la pagina bandit0 Esta maquina basicamente consiste en que para subir de nivel debemos obtener la flag de la maquina, esta flag sera la contraseña para la siguiente maquina Antes de iniciar debemos crear nuestro entorno...","categories": ["Bash","Bandit"],
        "tags": ["bash","scripting"],
        "url": "http://localhost:4000/first-bandit/",
        "teaser":"http://localhost:4000/assets/images/bandit0/bash-logo.jpg"},{
        "title": "tryhackme: Rootme",
        "excerpt":"1. Escaneo de puertos Lo primero que haremos ser un ping -c 1 al ip y ver si nuestra maquina ya esta activa usamos wichSystem.py (utilidad desarrollada por @s4vitar) para ver con que clase de maquina estamos trabajando Ahora realizamos un primer escaneo de puertos usando la nmap Descripción de...","categories": ["tryhackme"],
        "tags": ["web","SUID","RFI"],
        "url": "http://localhost:4000/Rootme/",
        "teaser":"http://localhost:4000/assets/images/rootme/logo.jpg"},{
        "title": "tryhackme: Kenobi",
        "excerpt":"Comprovamos que la maquina este iniciada correctamente enviandole un ping ping -c 1 10.10.37.122 PING 10.10.37.122 (10.10.37.122) 56(84) bytes of data. 64 bytes from 10.10.37.122: icmp_seq=1 ttl=63 time=154 ms --- 10.10.37.122 ping statistics --- 1 packets transmitted, 1 received, 0% packet loss, time 0ms rtt min/avg/max/mdev = 153.968/153.968/153.968/0.000 ms Como...","categories": ["tryhackme"],
        "tags": ["FTP","SSH","SUID"],
        "url": "http://localhost:4000/kenobi/",
        "teaser":"http://localhost:4000/assets/images/kenobi/logo.jpg"},{
        "title": "tryhackme: Mr Robot",
        "excerpt":"Comprobaremos que la maquina se encuentre activa ❯ ping -c 1 10.10.115.49 PING 10.10.115.49 (10.10.115.49) 56(84) bytes of data. 64 bytes from 10.10.115.49: icmp_seq=1 ttl=63 time=162 ms --- 10.10.115.49 ping statistics --- 1 packets transmitted, 1 received, 0% packet loss, time 0ms rtt min/avg/max/mdev = 161.950/161.950/161.950/0.000 ms Efectivamente, vemos que...","categories": ["tryhackme"],
        "tags": ["web","wordpress"],
        "url": "http://localhost:4000/MrRobot/",
        "teaser":"http://localhost:4000/assets/images/MrRobot/logo.jpg"},{
        "title": "Hackthebox: Secret",
        "excerpt":"Iniciamos comprobando que la maquina este activa antes que nada hacemos el envio de un paquete mediante ping para confirmar que la maquina esta activa, al mismo tiempo comprovamos que estamos frente a una maquina linux mediante el ttl ❯ ping -c 1 10.10.11.120 PING 10.10.11.120 (10.10.11.120) 56(84) bytes of...","categories": ["hackthebox"],
        "tags": [],
        "url": "http://localhost:4000/Secret/",
        "teaser":"http://localhost:4000/assets/images/secret/logo.jpg"},{
        "title": "tryhackme: vulnversity",
        "excerpt":"Iniciamos la fase de reconocimiento Antes de iniciar, verificamos que la maquina este activa ❯ ping -c 1 10.10.249.39 PING 10.10.249.39 (10.10.249.39) 56(84) bytes of data. 64 bytes from 10.10.249.39: icmp_seq=1 ttl=63 time=1085 ms --- 10.10.249.39 ping statistics --- 1 packets transmitted, 1 received, 0% packet loss, time 0ms rtt...","categories": ["tryhackme"],
        "tags": ["Nmap","Gobuster","Burp suite"],
        "url": "http://localhost:4000/vulnversity/",
        "teaser":"http://localhost:4000/assets/images/vulnversity/logo.jpeg"},{
        "title": "tryhackme: blue",
        "excerpt":"Iniciamos conprobando que la maquina este encendida ❯ ping -c 1 10.10.31.159 PING 10.10.31.159 (10.10.31.159) 56(84) bytes of data. 64 bytes from 10.10.31.159: icmp_seq=1 ttl=127 time=187 ms --- 10.10.31.159 ping statistics --- 1 packets transmitted, 1 received, 0% packet loss, time 0ms rtt min/avg/max/mdev = 186.669/186.669/186.669/0.000 ms ❯ settarget 10.10.31.159...","categories": ["tryhackme"],
        "tags": ["Ethernal blue - ms08-067","Windows"],
        "url": "http://localhost:4000/blue/",
        "teaser":"http://localhost:4000/assets/images/blue/logo.jpeg"},{
        "title": "tryhackme: LFI",
        "excerpt":"Local File Inclusion Esta técnica consiste en incluir ficheros locales, es decir, archivos que se encuentran en el mismo servidor de la web con este tipo de fallo (a diferencia de Remote File Inclusión RFI que incluye archivos alojados en otros servidores). Esto se produce como consecuencia de un fallo...","categories": ["tryhackme"],
        "tags": ["LFI","Local File Inclusion"],
        "url": "http://localhost:4000/LFI/",
        "teaser":"http://localhost:4000/assets/images/lfi/logo.png"},{
        "title": "tryhackme: Content Discovery",
        "excerpt":"iniciamos Realizamos un primer escaneo con nmap para ver los puertos abiertos e iniciar a “jugar” con la maquina ❯ sudo nmap --open --min-rate 5000 -sS -Pn -n 10.10.234.170 -oG allPorts [sudo] password for blanco: Starting Nmap 7.92 ( https://nmap.org ) at 2021-11-18 07:43 -05 Nmap scan report for 10.10.234.170...","categories": ["tryhackme"],
        "tags": ["Gobuster","Robots.txt"],
        "url": "http://localhost:4000/discovery/",
        "teaser":"http://localhost:4000/assets/images/discovery/logo.png"},{
        "title": "tryhackme: SQLInjection",
        "excerpt":"Conocida principalmente como SQLI, es un ataque a un servidor de base de datos de aplicaciones web que proboca la ejecución de consultas maliciosas Brief SQL es un lenguaje de dominio específico utilizado en programación, diseñado para administrar, y recuperar información de sistemas de gestión de bases de datos relacionales....","categories": ["tryhackme"],
        "tags": ["database","sql injection"],
        "url": "http://localhost:4000/SQLInjection/",
        "teaser":"http://localhost:4000/assets/images/sqli/logo.jpeg"}]
