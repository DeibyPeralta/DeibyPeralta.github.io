---
title: "tryhackme: Escalar privilegios"
share: false
excerpt: "Aprenda los fundamentos de la escalada de privilegios en Linux. Desde la enumeración hasta la explotación, conozca más de 8 técnicas diferentes de escalada de privilegios."
share: false
header:
  teaser:  /assets/images/linEscPriv/logo.jpg
  teaser_home_page: true
categories:
  - tryhackme
tags:
  - Web Server
  - Gobuster 
---

## ¿Qué significa "escalada de privilegios"?

En esencia, la escalada de privilegios generalmente implica pasar de una cuenta de permisos más bajos a una de permisos más altos.
Más técnicamente, es la explotación de una vulnerabilidad, falla de diseño o supervisión de configuración en un sistema operativo o 
aplicación para obtener acceso no autorizado a recursos que generalmente están restringidos para los usuarios.

### ¿Por qué es importante?

- Es raro que al realizar una prueba de penetración en el mundo real pueda obtener un punto de apoyo (acceso inicial) que le
brinde acceso administrativo directo.  
- La escalada de privilegios es crucial porque le permite obtener niveles de acceso de administrador 
del sistema, lo que le permite realizar acciones como:

1. Restablecimiento de contraseñas
1. Eludir los controles de acceso para comprometer los datos protegidos
1. Edición de configuraciones de software
1. Habilitación de la persistencia
1. Cambiar el privilegio de los usuarios existentes (o nuevos)
1. Ejecutar cualquier comando administrativo 


# Enumeración

La enumeración es el primer paso que debe realizar una vez que obtiene acceso a cualquier sistema. Es posible que haya accedido al 
sistema al explotar una vulnerabilidad crítica que resultó en el acceso a nivel de raíz o simplemente encontró una forma de enviar 
comandos usando una cuenta con pocos privilegios. Los compromisos de pruebas de penetración, a diferencia de las máquinas CTF, no 
terminan una vez que obtiene acceso a un sistema específico o nivel de privilegio de usuario. Como verá, la enumeración es tan 
importante durante la fase posterior al compromiso como lo es antes.

### hostname

El comando hostname devolverá el nombre de host de la máquina de destino. Aunque este valor se puede cambiar fácilmente o tener una
cadena relativamente sin sentido (p. ej., Ubuntu-3487340239), en algunos casos, puede proporcionar información sobre la función del
sistema de destino dentro de la red corporativa (p. ej., SQL-PROD-01 para un servidor SQL de producción) .


### uname -a

Imprimirá información del sistema que nos brinda detalles adicionales sobre el kernel utilizado por el sistema. Esto será útil al 
buscar posibles vulnerabilidades del kernel que podrían conducir a una escalada de privilegios.


### /proc/versión

El sistema de archivos proc (procfs) proporciona información sobre los procesos del sistema de destino. Encontrará proc en muchos 
sabores diferentes de Linux, lo que lo convierte en una herramienta esencial para tener en su arsenal.

Mirar /proc/version puede brindarle información sobre la versión del kernel y datos adicionales, como si está instalado un 
compilador (por ejemplo, GCC).

### /etc/problema

Los sistemas también se pueden identificar consultando el archivo /etc/issue. Este archivo generalmente contiene información 
sobre el sistema operativo, pero se puede personalizar o cambiar fácilmente. Hablando sobre el tema, cualquier archivo que contenga 
información del sistema se puede personalizar o cambiar. Para una comprensión más clara del sistema, siempre es bueno mirar todos 
estos.

## pd comand

El comando ps es una forma efectiva de ver los procesos en ejecución en un sistema Linux. Escribir ps en su terminal mostrará los 
procesos para el shell actual.

La salida de ps (Estado del proceso) mostrará lo siguiente;

```bash
PID: El ID del proceso (único para el proceso)
TTY: Tipo de terminal utilizado por el usuario
Tiempo: cantidad de tiempo de CPU utilizado por el proceso (este NO es el tiempo que se ha estado ejecutando este proceso)
CMD: el comando o ejecutable en ejecución (NO mostrará ningún parámetro de línea de comando)
```

El comando "ps" proporciona algunas opciones útiles.

```bash
ps -A: Ver todos los procesos en ejecución
ps axjf: Ver el árbol de procesos (ver la formación del árbol hasta que se ejecute ps axjf a continuación)
ps aux: The aux option will show processes for all users (a), display the user that launched the process (u),and show processes  
   that are not attached to a terminal (x). Looking at the ps aux command output, we can have a better 
   understanding of the system and potential vulnerabilities.
```

### env 

El comando env mostrará las variables de entorno.


