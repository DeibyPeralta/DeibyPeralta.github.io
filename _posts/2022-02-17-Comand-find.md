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
