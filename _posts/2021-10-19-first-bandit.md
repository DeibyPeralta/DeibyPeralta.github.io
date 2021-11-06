---
title: "Bandit0: Bash para principiantes"
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

En este post obtendremos las flags de la maquina bandit que se encuentra en la pagina [bandit0](https://overthewire.org/wargames/bandit/)

Esta maquina basicamente consiste en que para subir de nivel debemos obtener la flag de la maquina, esta flag sera la contraseña para la siguiente maquina

Antes de iniciar debemos crear nuestro entorno de trabajo
 
```bash
mkdir bandit0
cd bandit0
```

---
---
---

# Banquid 0 --> 1
Esta primera maquina consiste en que debemos conectarnos a ella mediante SSH **bandit.labs.overthewire.org** usando el puerto 2220, como usuario y contraseña
usaremos **bandit0**

A continuacion nos conectamos a la maquina
```python

ssh bandit0@bandit.labs.overthewire.org -p 2220

```

lo primero que hacemos es un **ls** para ver los archivos que hay en la maquina...
En este caso solo hay un archivo llamado **readme** 
le hacemos un _cat readme_ y vemos la flag
Debemos copiarla en un archivo txt (o de vuestra preferencia) puesto que esta sera la key para la siguiente maquina

![obtenemos la flag](/assets/images/bandit0/0.png)


---
---
---

# bandit 1 --> 2

Usamos la _flag_ que obtuvimos en la maquina pasada y la usamos como contraseña en esta maquina.

Ahora ya estamos en el nivel 1 de bandit, la descripcion de la maquina nos dice
> The password for the next level is stored in a file called - located in the home directory

Por tanto, sabemos que la proxima contraseña se encuentra dentro de un directorio de nombre **-**

Para poder leer archivo hay diferentes metodos, en este caso usaremos _cat ./*_ , lo que nos permite el comando **cat** es leer todo dentro del directorio _./*_
lo podemos hacer puesto que sabemos que el directorio solo contiene un archivo a leer

![Obtenemos la flag](/assets/images/bandit0/1.png)


---
---
---

# bandit 2 --> 3

Usamos la _flag_ que obtuvimos en la maquina pasada y la usamos como contraseña en esta maquina.

leemos lo que nos dice la descripcion de la maquina
> The password for the next level is stored in a file called spaces in this filename located in the home directory

 

Aca iniciamos con pequeños inconvenientes puesto que no podemos leer directamente con el comando *cat*

### vemos el archivo

```bash
bandit2@bandit:~$ ls
spaces in this filename
```

Estos metodos lo que nos permite es "escapar" de los espacios
![Obtenemos la flag](/assets/images/bandit0/2.png)


### Vemos 2 formas de cumplir nuestro objetivo (obtener la flag), sin embargo, hay metodos mas practicos de hacerlos por ejemplo:

Es un poco mas practico puesto (para este caso) puesto que "escapamos" de los espacios y visualizamos la flag con menos comando

- El primero, con *cat* nos muestra la informacion de los ficheros dentro de la ruta en donde estamos (para este caso solo tenemos un documento)
- El segundo, nos muestra la información que contengan los ficheros que inicien con *s*

![Flag](/assets/images/bandit0/2_1.png)

---
---
---

# bandit 3 --> 4

> The password for the next level is stored in a hidden file in the inhere directory.


```bash
bandit3@bandit:~$ ls
inhere
bandit3@bandit:~$ cd inhere
bandit3@bandit:~/inhere$ pwd
/home/bandit3/inhere
```
- Vemos que solo existe el directorio *inhere*, entramos en el


```bash
bandit3@bandit:~/inhere$ ls -la
total 12
drwxr-xr-x 2 root    root    4096 May  7  2020 .
drwxr-xr-x 3 root    root    4096 May  7  2020 ..
-rw-r----- 1 bandit4 bandit3   33 May  7  2020 .hidden

```
- Usamos los comando *ls -la* para los listar directorios ocultos (en linux inician con *.*)

```bash
bandit3@bandit:~/inhere$ cat .hidden
pIwrPrtPN36QITSp3EQaw936yaFoFgAB
```
- Para poder leer el contenido del fichero debemos usar *cat* incluyendo el punto que tiene en el nombre el archivo

---
---
---

# bandi 4 --> 5

> The password for the next level is stored in the only human-readable file in the inhere directory. Tip: if your terminal is messed up, try the “reset” command.

# solucion 1

- Despues de entrar en el directorio inhere listamos el contenido 

``` bash
bandit4@bandit:~/inhere$ find ./*
./-file00
./-file01
./-file02
./-file03
./-file04
./-file05
./-file06
./-file07
./-file08
./-file09
```

- al comando anterior le agregamos *| xargs file* lo cual nos especifica el tipo de archico que tenemos

```bash 
bandit4@bandit:~/inhere$ find ./* | xargs file
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
```

- Le añadimos el *grep TEXT -i*, la funcion de este comando es filtrar los archivos solo en *texto legible por humanos* la bandera *-i* es para que no distinga entre m>

```bash
bandit4@bandit:~/inhere$ find ./* | xargs file | grep TEXT -i
./-file07: ASCII text
```
- Finalmente le hacemos el ultimo filtro con *awk* y la bandera *-F* la cual solo nos tomara el primer parametro _./-file07_ y con el *| xargs cat* leemos la flag

```bash
bandit4@bandit:~/inhere$ find ./* | xargs file | grep TEXT -i | awk -F: '{print $1}' | xargs cat
koReBOKuIDDepwhWk7jZC0RTdopnAYKh
```


# Solucion 2 (mas corta)

- Para este caso nos funciona puesto que es el unico archivo de texto *./-file07: ASCII text*

```bash 
bandit4@bandit:~/inhere$ find ./* | xargs file
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: data
```
- simplemente le hacemos un *cat FileName* y obtenemos la flag

```bash 
bandit4@bandit:~/inhere$ cat ./-file07
koReBOKuIDDepwhWk7jZC0RTdopnAYKh
```
---
---
---

# bandit 5 --> 6

> The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:
>
> - human-readable
> - 1033 bytes in size
> - not executable

- Inicialmente hacemos un *ls* para ver a que nos enfrentamos y vemos que existen multiples carpetas.

```bash
bandit5@bandit:~/inhere$ ls
maybehere00  maybehere02  maybehere04  maybehere06  maybehere08  maybehere10  maybehere12  maybehere14  maybehere16  maybehere18
maybehere01  maybehere03  maybehere05  maybehere07  maybehere09  maybehere11  maybehere13  maybehere15  maybehere17  maybehere19
```
- Especificamos varios filtros *-readable* para ver archivos legibles por humanos
- *find* posee la bandera *-execuatable* para buscar archivs con permisos de ejecucion
- size *1033c* nos permite buscar archivos de 1033 bytes (usando la opción c)

```bash
bandit5@bandit:~/inhere$ find . -readable ! -executable -size 1033c | xargs cat | xargs
DXjZPULLxYr17uwoI01bNLQbtFemEgo7
```

---
---
---

# bandit 6 --> 7

> The password for the next level is stored somewhere on the server and has all of the following properties:
>
> - owned by user bandit7
> - owned by group bandit6
> - 33 bytes in size

- Hacemos uso nuevamente del manual de *find* para poder buscar las banderas indicadas
- *-user bandi7* filtra por archivos de propiedad de _bandit7_
- *-group bandit6* filtra por propiedad del _grupo bandit6_
- *-zise 33c* filtra por archivo de 33bytes
- El STDERR es identificado con el número 2, y sus mensajes pueden ser redirigidos (usando el símbolo >) a /dev/null (archivo especial utilizado para descartar información):

```bash
bandit6@bandit:~$ find / -user bandit7 -group bandit6 -size 33c 2>/dev/null | xargs cat
HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs
```

# bandit 7 --> 8

> The password for the next level is stored in the file data.txt next to the word millionth

- usamos el comando *cat data.txt* pero al ver el contendio de _data.txt_

```bash
bandit7@bandit:~$ cat data.txt 
canonization's  7ITrZvFVzsjujBHVlu4gfcHbW1gWQUcN
reserve AHO3PedgUR05aCaQVGVFQRgY2oR1SBYh
Zanuck  30KRlOQjnCq5DyqNZePHAD6tCZbVjT1f
baritone        XSodKcCZa05ckkLyP4uXwrjIVaCzKcpq
lineman's       Gh8HTLmWxnXJxZF4DzhuiRpV8xejb6yw
aquas   RkI4EWYAjHPMexRFTY9Rq7vQtjhiKgZw
swaddled        snDpr6ve7nuPsjBoTGLrmpOYomdhVzAH
garishness's    UbK1yZ2nC02GEjArlASLw0bT8jgOp9rx
Benny's QQkZrdiFs47KckVLi5ifsFqtLcRxyjvZ
regulated       sxJ8HT73fvZMMIicL50nhawcrsYGUiWP
knotting        vh268WJXw1OSnszed9MVaHD4rTP69lZr
hymnals 7MqsN32lfDbPigtAX6cwFbMZcPAMUoae
Fremont tCy02wC8xdpFqjlZ8xdBQYAHFZPHk7ls
punter's        zAfzaA1IOuBSamCR6eMmRoc9oNXPQ16a
junking 6Tlr5K8YZ1d2Xsdku3TTFYXWB6WOMXyT
Aymara  zSeUS0UyD8Q6a6YPwaClRBbk1x8kFBEc
waned   gL59r6xvewh5y8t0mgiNtHtCUMG8S6Id
conceded        TWLUptX3HbwD4qsYOQ9sENOnOiNy79sC
kilned  kLjrgoJvftIyUyotuOI4cxFcxQXbC6aS
Santayana       KKn1I4fuWdzKyvffp1aYrBDzQa3Tr3Pk
Antigua dRyNieqAg0OkCgrKVQFXMXS06vFArL55
heyday  UAGwMlFzylGa4fHpQZEelUQEZ5JlUpyX
praiseworthiness's      bjRB0uGXM4dH7ip9hHB3mbFBMMwlNKNq
```

tiene demasiadas lineas para buscar manualmente

- usamos _cat data.txt | wc_ para ver el total de lineas de texto que contien el archivo

```bash
bandit7@bandit:~$ cat data.txt | wc
  98567  197133 4184396
```
Como ya se mensiono anteriormente, buscar linea a linea la que contenga la palabra millionth seria bastante engorroso, para omitir eso, usaremos grep junto 
con una bandera

- Usando *grep* podemos filtrar por la palabra _millionth_ usando la bandera *-i* para que no distinga entre mayusculas y minusculas

```bash
bandit7@bandit:~$ cat data.txt | grep -i millionth
millionth       cvX2JJa4CFALtqS87jk27qwqGhBM9plV
```

---
---
---

# bandit 8 --> 9

> The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

- Usamos el comando *sort* para ordenar el input en orden alfabetico

- Usamos el *uniq -u* para mostrar solo las lineas que no estan repetidas

```bash
bandit8@bandit:~$ cat data.txt | sort | uniq -u
UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR
```

---
---
---

# bandi 9 --> 10

> The password for the next level is stored in the file data.txt in one of the few human-readable strings, preceded by several ‘=’ characters.

- Usamos el comando *strings cat* para ver los caracteres legibles por humanos

```bash
bandit9@bandit:~$ strings data.txt
Z/,_
WW"&8
2Qk)
xWa_
x?Xn
//M$
;yzEt!
WpU~e
`Rn,I
VSXdK
WB|{
GhG$
========== the*2i"4
DUJmU
```

- ahora vamos a filtrar con *grep '='*

```bash
andit9@bandit:~$ strings data.txt | grep '='
========== the*2i"4
=:G e
========== password
<I=zsGi
Z)========== is
A=|t&E
Zdb=
c^ LAh=3G
*SF=s
&========== truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
S=A.H&^
```

- con el comando *tail -n 2*, tomamos las 2 ultimas lineas del output anterior

```bash
bandit9@bandit:~$ strings data.txt | grep '=' | tail -n 2
&========== truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
S=A.H&^
```

- el comando *head -n 1* nos toma la primer liena del output anterior

```bash
bandit9@bandit:~$ strings data.txt | grep '=' | tail -n 2 | head -n 1
&========== truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
```

- Finalmente, agregamos el filtro *awk '{print $2}'* para filtrar el output anterior y solo tomamos la 2 cadena de texto

```bash
bandit9@bandit:~$ strings data.txt | grep '=' | tail -n 2 | head -n 1 | awk '{print $2}'
truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
```

---
---
---

# bandit 10 --> 11

> The password for the next level is stored in the file data.txt, which contains base64 encoded data

- Comprovamos lo mencionado anteriormente, esta codificado en base64

```bash
bandit10@bandit:~$ cat data.txt
VGhlIHBhc3N3b3JkIGlzIElGdWt3S0dzRlc4TU9xM0lSRnFyeEUxaHhUTkViVVBSCg==
```

- usamos *base64 -d* para decodificarlo, y obtenemos la flag

```bash
bandit10@bandit:~$ cat data.txt | base64 -d
The password is IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR
```

---
---
---

# bandit 11 --> 12

> The password for the next level is stored in the file data.txt, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

- La guia de bandit nos dice que esta *cifrado en Cesar*, la diferencia es que esta modido 13 posiciones

```bash
bandit11@bandit:~$ cat data.txt
Gur cnffjbeq vf 5Gr8L4qetPEsPk8htqjhRK8XSP6x2RHh
```

- Usamos [decrypt cesar 13 positions](https://cryptii.com/pipes/caesar-cipher)

```bash
The password is 5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu
```


---
---
---

# bandit 12 --> 13

> The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work using mkdir. For example: mkdir /tmp/myname123. Then copy the datafile using cp, and rename it using mv (read the manpages!)

- Antes de trabajar con el archivo, movemos el .rar en la ruta indicada

```bash
bandit12@bandit:/tmp/myname123$ ls
data2.txt.bz2
```

- Para pasar el hexdump a un archivo normal, usamos el comando *xxd*. Este tiene la opción *-r*, que permite convertir un hexdump a un binario:

```bash
bandit12@bandit:/tmp/myname123$ ls
data  data2.txt
```

La idea de este reto es aprender a descomprimir diferentes tipos de archivos, pero
se puede solucionar usando los siguientes comandos:

- *zcat* descomprime una lista de archivos (.gz) en la línea de comando o su _standard input_ y escribe los datos sin comprimir en el standard _output_
- *bzcat* es similar que zcat (descomprime todos los archivos indicados y lo envía _standard output_), pero de archivos _.bz2_
- *tar xO*, donde _x_ es para extraer, y _O_ es para extraer el archivo a un _standard output_
- *file -* permite ver el formato del archivo descomprimido, donde el nombre de este es reemplazado por el símbolo _-_
```bash
bandit12@bandit:/tmp/myname123$ zcat data | bzcat | zcat | tar xO | tar xO | bzcat | tar xO | zcat | cat
The password is 8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL
```
