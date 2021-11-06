---
title: "Bandit0: Bash para principiantes - 2da parte"
share: false
excerpt: "El mejor metodo de aprendizaje es practicando"
share: false
header:
  teaser:  /assets/images/bandit0/bash-logo.jpg
  teaser_home_page: true
categories:
  - Bash
  - Bandit
tags:
  - bash
  - scripting
---

Continuando con la maquina [bandit 13 --> 14](https://overthewire.org/wargames/bandit/bandit14.html)

----
----
----

# bandit 13 --> 14

> The password for the next level is stored in /etc/bandit_pass/bandit14 and can only be read by user bandit14. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. Note: localhost is a hostname that refers to the machine you are working on

- Obtenemos la llave privada para conectarnos por *ssh*

```bash
bandit13@bandit:~$ ls
sshkey.private
```

-  Usamos la sshkey para conectarnos mediante *SSH* al usuario _bandit14_ para buscar la flag

```bash
bandit13@bandit:~$ ssh -i sshkey.private bandit14@localhost

bandit14@bandit:~$ whoami
bandit14
```

- Le hacemos un *cat* a la ruta que nos indica la maquina para obtener la contraseña
```bash
bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e
```

----
----
----

# bandit 14 --> 15

> The password for the next level can be retrieved by submitting the password of the current level to port 30000 on localhost.

- Validamos la contraseña del nivel actual.

```bash
bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e
```

- Al enviar la contraseña por el puerto 30000 como se nos indiga, obtenemos la *password* para el siguiente nivel

```bash
bandit14@bandit:~$ echo '4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e' | nc localhost 30000
Correct!
BfMYroe26WYalil77FoDi9qh59eK5xNr
```

----
----
----

# bandit 15 --> 16

> The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL encryption.
> Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…

- Usamos *openSSL* para cifrar la comunicación
- *s_cliente* porque hacemos de cliente y no de servidor
- *-connect localhost@30001* conectarnos al puerto *30001*

```bash
bandit15@bandit:~$ openssl s_client -connect localhost:30001 -ign_eof
CONNECTED(00000003)
depth=0 CN = localhost
verify error:num=18:self signed certificate
verify return:1
depth=0 CN = loca
```
- Le enviamos la contraseña del nivel actual y nos regresa la contraseña para el siguiente

```bash
BfMYroe26WYalil77FoDi9qh59eK5xNr
Correct!
cluFn7wTiGryunymYOu4RcffSxQluehd
```

----
----
----

# bandit 16 --> 17

> The credentials for the next level can be retrieved by submitting the password of the current level to a port on localhost in the range 31000 to 32000. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

- Lo primero que hacemos en encontrar los puertos que se nos indican

```bash
bandit16@bandit:~$ nmap --open -T5 -n -vv -p31000-32000 localhost
PORT      STATE SERVICE REASON
31046/tcp open  unknown syn-ack
31518/tcp open  unknown syn-ack
31691/tcp open  unknown syn-ack
31790/tcp open  unknown syn-ack
31960/tcp open  unknown syn-ack
```
- Validamos cual permite conexion *ssl*, despues de un tanteo, damos con el puerto *31790*

```bash
bandit16@bandit:~$ openssl s_client -connect localhost:31790
CONNECTED(00000003)
depth=0 CN = localhost
verify error:num=18:self signed certificate
verify return:1
depth=0 CN = localhost
verify return:1
```

- Enviamos la contraseña actual y obtenemos una *id_rsa* que guardamos en un documento, esto lo haremos en un directorio temporal

```bash
bandit16@bandit:~$ mktemp -d
bandit16@bandit:~$ cd /tmp/tmp.9jaKsgTmsa
bandit16@bandit:/tmp/tmp.9jaKsgTmsa$ ls
id_rsa
```

- Nos conectamos al usuario _bandit17_ con la *id_rsa* obtenia enteriormente, procedemos a obtener la flag

```bash
bandit16@bandit:/tmp/tmp.9jaKsgTmsa$ ssh -i id_rsa bandit17@localhost
bandit17@bandit:~$ cat /etc/bandit_pass/bandit17
xLYVMN9WE5zQ5vHacb0sZEVqbrp7nBTn
```

----
----
----

# bandit 17 --> 18

> There are 2 files in the homedirectory: passwords.old and passwords.new. The password for the next level is in passwords.new and is the only line that has been changed between passwords.old and passwords.new

- Para ver las diferencias en ambos documentos, usamos la herramienta *diff*

```bash
bandit17@bandit:~$ diff passwords.old passwords.new
42c42
< w0Yfolrc5bwjS4qw5mq1nnQi6mF03bii
---
> kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd
```

----
----
----

# bandit 18 --> 19

> The password for the next level is stored in a file readme in the homedirectory. Unfortunately, someone has modified .bashrc to log you out when you log in with SSH

- Al intentar inicar sesion mediante *SSH*, el servidor nos expulsa

```bash
 ssh bandit18@bandit.labs.overthewire.org -p 2220     
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password: 
Linux bandit.otw.local 5.4.8 x86_64 GNU/Linux

--[ More information ]--

  For more information regarding individual wargames, visit
  http://www.overthewire.org/wargames/

  For support, questions or comments, contact us through IRC on
  irc.overthewire.org #wargames.

  Enjoy your stay!

Byebye !
Connection to bandit.labs.overthewire.org closed.
```

- Cabe resaltar que antes de expulsarnos, existe un minimo de tiempo, aprovechamos eso para intentar crear una bash y leer el *readme*

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 bash
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password: 
whoami
bandit18
ls
readme
cat readme
IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x
```

----
----
----

# bandi 19 --> 20

> To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary

- Vemos que tenemos un binario con permisos *setuid*

```bash
bandit19@bandit:~$ ls -l
total 8
-rwsr-x--- 1 bandit20 bandit19 7296 May  7  2020 bandit20-do

```

- Ejecutamos *./bandit20-do* y vemos que lo hacemos como usuario _banditd20_

```bash
bandit19@bandit:~$ ./bandit20-do
Run a command as another user.
  Example: ./bandit20-do id
bandit19@bandit:~$ ./bandit20-do whoami
bandit20
```

- Intentamos ejecutar una bash, debemos hacer uso del parametro *-p*

```bash
bandit19@bandit:~$ ./bandit20-do bash -p
bash-4.4$ whoami
bandit20
```
- Perfecto, tenemos una bash como usario bandit20
- Obtenemos la flag

```bash
bash-4.4$ cat /etc/bandit_pass/bandit20
GbKksEFF4yrVs6il55v6gwY5aVje5f0j
```

# bandit 20 --> 21

> There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

- Vemos que es lo que tenemos en el home 

```bas
bandit20@bandit:~$ ls
suconnect
bandit20@bandit:~$ ./suconnect
Usage: ./suconnect <portnumber>
This program will connect to the given port on localhost using TCP. If it receives the correct password from the other side, the next password is transmitted back.
```

- Debemos ejecutar *./suconnect* y decirle por cual puerto nos conectaremos

```bash
bandit20@bandit:~$ nc -nlvp 1234
listening on [any] 1234 ...
```

- Ponemos otra conexion en escucha

```bash
bandit20@bandit:~$ ./suconnect 1234
Read: GbKksEFF4yrVs6il55v6gwY5aVje5f0j
Password matches, sending next password
```

- Nos conectamos y le enviamos la contraseña actual, y nos devuelve la siguiente password

```bash
bandit20@bandit:~$ nc -nlvp 1234
listening on [any] 1234 ...
connect to [127.0.0.1] from (UNKNOWN) [127.0.0.1] 54404
GbKksEFF4yrVs6il55v6gwY5aVje5f0j
gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr
```

----
----
----

# bandit 21 --> 22

> A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

## Los programas en *cron* son programas que se ejecutan cada cierto tiempo

- Vemos los programas que se ejecuntan en *cron*

```bash
bandit21@bandit:~$ ls -l /etc/cron.d
total 24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit15_root
-rw-r--r-- 1 root root  62 Jul 11  2020 cronjob_bandit17_root
-rw-r--r-- 1 root root 120 May  7  2020 cronjob_bandit22
-rw-r--r-- 1 root root 122 May  7  2020 cronjob_bandit23
-rw-r--r-- 1 root root 120 May 14  2020 cronjob_bandit24
-rw-r--r-- 1 root root  62 May 14  2020 cronjob_bandit25_root
```

- Vemos que ejecuta un script en bash

```bash
bandit21@bandit:~$ cat /etc/cron.d/cronjob_bandit22
@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
```

- Intentamos ver el script
- Vemos que tiene permisos 644
- Tambien vemos que ejecuta un archivo existente

```bash
bandit21@bandit:~$ cat /usr/bin/cronjob_bandit22.sh
#!/bin/bash
chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

- Vemos el archivo que y, ¡tenemos la flag!

```bash
bandit21@bandit:~$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI
```
