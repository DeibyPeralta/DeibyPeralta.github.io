---
title: "tryhackme: The find command"
share: false
excerpt: "Un enfoque de aprendizaje del comando find"
share: false
header:
  teaser:  /assets/images/find/logo.jpeg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - find
  - command
---
## Quizas uno de los comandos mas utilizados

- Puede que sea uno de los comandos mas utilizados en linux por pentester, entro otros
- Cuando sabe exactamente lo que está buscando, no necesita buscarlo; solo tienes que encontrarlo 

## Banderas mas utiles

Dos banderas muy útiles son las banderas *-type* y *-name*. 

- Con *-type*, puede usar _d_ para buscar solo directorios y _f_ solo archivos
- La *-name* bandera se usa para especificar un nombre o patrón para buscar. Puede escribir el nombre completo o usar comodines para especificar solo parte(s) del nombre.

## Example

> Encuentra todos los archivos cuyo nombre termina con ".xml"  
- find / -type f -name "*.xml"

> Encuentre todos los archivos en el directorio /home (recursivo) cuyo nombre sea "user.txt" (sin distinción entre mayúsculas y minúsculas)  
- find /home -type f -iname user.txt

> Encuentra todos los directorios cuyo nombre contenga la palabra "exploits"  
- find / -type -d -name "*exploits*"

## Otros casos

En algunas situaciones, especificar solo el nombre de un archivo no será suficiente. También puede especificar el propietario, el tamaño, los permisos y la última vez que se accedió/modificó el archivo.

*-user*: Bandera para especificar el nombre del propiertario del archivo   
*-size*: Se especifica el tamaño del archivo    
*-perm*: Se usa para especificar permisos
- ya sea en forma octal (ej. 644) o en forma simbólica (ej. u=r)    
- Usar el */* prefijo devolverá archivosque coincidan con cualquiera de los permisos que haya establecido     
- El uso del –prefijo devolverá archivos con al menos los permisos que especifique; esto significa que el -444modo coincidirá con los archivos que todos pueden leer

## Permisos
 usamos la bandera *-perm* y podemos buscar permisos de maneras diferentes, ya sea octal o de forma simbolica
 
 - Octal: *644*, para este ejemplo permite al propietario del archivo leer y escribir, y los demas usuarios solo leer
 - simbolica: *o=w*, permite al grupo "otros" escribir

## SUID

usamos la bandera *-perm*, sin embargo, en esta ocación se hace asi: *-u=s*

## Tiempo de modificación

- usamos la bandera especificar que se accedió por última vez a un archivo hace más de 30 minutos *-amin +30*
- Para especificar que se modificó hace menos de 7 días se utiliza la opción *-mtime -7*

> Encuentra todos los archivos propiedad del usuario "kittycat"  
- find / -type f -user kittycat

> Encuentre todos los archivos que tengan exactamente 150 bytes de tamaño  
- find / -type f -size -150c

> Encuentre todos los archivos en el directorio /home (recursivo) con un tamaño inferior a 2 KiB y extensión ".txt"  
- find /home -type f -size -2k -name "*.txt"

> Encuentre todos los archivos en el directorio /usr/bin (recursivo) que son propiedad de root y tienen al menos el permiso SUID (use formato simbólico)  
- find /usr/bin -type f -user root -perm -u=s

> Encuentre todos los archivos a los que no se accedió en los últimos 10 días con la extensión ".png"  
- find / -type f -atime +10 -name "*.png
