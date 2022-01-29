---
title: "The Hacker Methodology"
share: false
excerpt: "Introduction to the Hacker Methodology"
share: false
header:
  teaser:  /assets/images/methodology/logo.jpg
  teaser_home_page: true
categories:
  - metodologia
  - Privilege Escalation
tags:
  - bash
  - osint
---

### Esquema de la metodología

## antes que nada

Cabe resaltar que un hacker no es ningun delicuente que aprovecha sus conocimientos en informatica, todo lo contrario, hacker es toda persona aquella que lleva al limite sus conocimientos (no solo existen hacker informaticos).

> ¿Qué proceso sigue un Hacker?

Aunque se podría pensar que un hacker hace lo que le da la gana, lo cierto es que los hackers/probadores de intrusión profesionales suelen seguir un proceso establecido para entender y explotar sus objetivos. Esto asegura que haya consistencia entre cómo se realizan las evaluaciones en toda la industria, y es la metodología que impulsa las evaluaciones.


El Proceso que siguen los pentesters se resume en los siguientes pasos:

- Reconocimiento
- Enumeración/Escaneo
- Ganando acceso
- Escalada de privilegios
- cubriendo pistas
- Informes

### Resumen de reconocimiento

La primera fase de la metodología del hacker ético es el *reconocimiento.*

> El reconocimiento consiste en recopilar la mayor cantidad de información sobre el objetivo.

En general, el reconocimiento no implica ninguna interacción con el objetivo o el sistema. 

El reconocimiento es un concepto bastante simple, piensa en las herramientas que podemos utilizar en Internet para recopilar información sobre las personas.

¿Qué sitios web y tecnología nos vienen a la mente para recopilar información sobre una organización, tecnología o conjunto de personas objetivo?

En este caso, vamos a utilizar como ejemplo la empresa SpaceX. Detente aquí y dedica 2 minutos a investigar sobre SpaceX y anota los sitios web que hayas utilizado para realizar la investigación.

###¿Dónde comenzamos la investigación sobre SpaceX?

> Lo más probable es que hayas empezado por una de las herramientas más útiles que posee un Hacker:  
> Google

Google es una herramienta increíblemente útil, y existe toda una sala (Google Dorking Room) para utilizarla eficazmente para realizar investigaciones.

Tambien podemos utilizar sitios web como Wikipedia para conocer la historia de SpaceX, podemos haber utilizado el Twitter/YouTube de la empresa para ver sus últimos comunicados de prensa o "sizzle-reels", o incluso el perfil de LinkedIn para investigar los puestos vacantes de la empresa y/o la estructura organizativa de la misma.

Lo bueno es que todas estas herramientas tan sencillas son válidas para el reconocimiento.

Puede que pienses que los hackers utilizan herramientas especiales para llevar a cabo la investigación (y en algunos casos es cierto), pero en general utilizan herramientas simples como éstas para llevar a cabo la investigación.

El reconocimiento suele implicar el uso de herramientas disponibles públicamente, como Google, para realizar una investigación sobre el objetivo.

Aunque parezca sencillo, el *reconocimiento es la fase más importante de una prueba de penetración.*

Hay algunas herramientas especializadas que podemos utilizar, pero para esta introducción, es bueno conocer las siguientes herramientas. 

- Google (específicamente Google Dorking)
- Wikipedia
- PeopleFinder.com
- who.is
- sublist3r
- hunter.io
- builtwith.com
- wappalyzer


> Who is the CEO of SpaceX?  
> Elon Musk

> Do some research into the tool: sublist3r, what does it list?  
> subdomains

> What is it called when you use Google to look for specific vulnerabilities or to research a specific topic of interest?  
> Google Dorking

###  Resumen de enumeración y escaneo

La segunda fase de la Metodología Hacker es el Escaneo y la Enumeración.

Aquí es donde un hacker comenzará a interactuar con (escanear y enumerar) el objetivo para intentar encontrar vulnerabilidades relacionadas con el objetivo.

Aquí es donde las herramientas más especializadas comienzan a entrar en el arsenal. Herramientas como nmap, dirb, metasploit, exploit-db, Burp Suite y otras son muy útiles para ayudarnos a tratar de encontrar vulnerabilidades en un objetivo. (No te preocupes por ellos ahora, puedes entrar en el meollo más tarde)

En la fase de escaneo y enumeración, el atacante está interactuando con el objetivo para determinar su superficie de ataque general.

La superficie de ataque determina a qué puede ser vulnerable el objetivo en la fase de explotación. Estas vulnerabilidades pueden ser de diversa índole: desde una página web que no está bien cerrada, un sitio web que filtra información, inyección SQL, Cross Site Scripting o cualquier otra vulnerabilidad.

Para simplificar, la fase de enumeración y escaneo es donde trataremos de determinar a qué puede ser vulnerable el objetivo.

Por ejemplo, una herramienta importante en nuestro arsenal es una herramienta llamada Nmap 

```bash
❯ sudo nmap -p- --open --min-rate 5000 -sS -Pn -n ip -oG allPorts
```

En lo personal, en su mayoria (depente el entorno) es muy util escanear el rango completo de puertos (65536) y "filtrar" solo por aquellos que esten abiertos


Nmap es una herramienta que puede escanear un objetivo y decirnos una gran variedad de cosas:

1. Qué puertos están abiertos (si no sabes nada de puertos te recomiendo que veas esto: https://www.youtube.com/watch?v=PpsEaqJV_A0 y https://www.youtube.com/watch?v=qsZ8Qcm6_8k)

1. El sistema operativo del objetivo (Windows, Linux, MacOS, etc. incluyendo qué versión del sistema operativo)

1. Qué servicios se están ejecutando y qué versión del servicio (por ejemplo, sólo decir FTP (File Transfer Protocol) no es suficiente - nmap puede intentar hacer una huella digital y determinar la VERSIÓN exacta de FTP que puede permitirnos encontrar una vulnerabilidad específica en el objetivo)
Aunque esto pueda parecer mucha información (suficiente para pwnear a cualquiera y cualquier cosa, ¿verdad?) hay otras herramientas que también se utilizarán en el arsenal de reconocimiento.

Aquí hay una muestra rápida de otras herramientas que puedes aprender en TryHackMe:

- dirb (se utiliza para encontrar directorios con nombres comunes en un sitio web - como por ejemplo, bajo https://www.tesla.com también hay https://www.tesla.com/about, https://www.tesla.com/model3, https://www.tesla.com/modely, y lo más importante https://www.tesla.com/models ¡¡¡¡MODO LUDICROUS!!! ♥) 

- dirbuster (similar a dirb pero con un nombre más chulo, y con una interfaz de usuario)

- enum4linux (herramienta utilizada específicamente para Linux para encontrar vulnerabilidades)

- metasploit (esta herramienta se utiliza principalmente para la explotación, pero también tiene algunas . herramientas de enumeración incorporadas)

- Burp Suite (esta herramienta puede utilizarse para escanear un sitio web en busca de subdirectorios e interceptar el tráfico de red)


> ¿Qué ayuda a determinar la enumeración sobre el objetivo?  
> attack surface. *superficie de ataque.*

> Haz un reconocimiento sobre la herramienta: Metasploit, ¿qué empresa la desarrolló?  
> rapid7

> ¿Qué empresa desarrolló la tecnología detrás de la herramienta Burp Suite?  
> Portswigger

###  Exploitation

Ahora que hemos hablado de las otras tres fases de un pentest, es el momento de hablar de la que a menudo se presenta como "la más guay".

En las noticias, a menudo se habla de "este hack" o "esta vulnerabilidad", pero la verdad es que normalmente la fase de "explotación" de un pentest no es tan glamurosa como parece. La fase de explotación sólo puede ser tan buena como las fases de reconocimiento y enumeración que la preceden, si no has enumerado todas las vulnerabilidades puedes perder una oportunidad, o si no has mirado lo suficiente el objetivo - ¡el exploit que has elegido puede fallar por completo!

Una herramienta común utilizada para la explotación se llama Metasploit que tiene muchos scripts incorporados para tratar de mantener la vida simple.

También puedes utilizar herramientas como Burp Suite y SQLMap para explotar aplicaciones web. Hay herramientas como msfvenom (para construir cargas útiles personalizadas), BeEF (explotación basada en el navegador), y muchas otras.

TryHackMe tiene una tonelada de salas dedicadas a aprender los fundamentos de estas herramientas, ¡y recomiendo aprender de todas ellas!

## sólo toca recordar que un probador de penetración profesional nunca salta a la fase de explotación sin hacer un reconocimiento y enumeración adecuados. 


### Privilege Escalation

Después de que hayamos obtenido acceso a una máquina víctima a través de la fase de explotación, el siguiente paso es escalar los privilegios a una cuenta de usuario superior. Las siguientes cuentas son las que intentamos alcanzar como pentester:

En el mundo de Windows, la cuenta objetivo suele ser: Administrador o Sistema.
En el mundo de Linux, la cuenta objetivo suele ser: root
Como puedes ver, descubrir en qué sistema operativo se ejecuta un dispositivo es muy importante para determinar cómo escalaremos nuestros privilegios más adelante. Una vez que obtengamos acceso como un usuario de nivel inferior, intentaremos ejecutar otro exploit o encontrar una forma de convertirnos en root o administrador.

La escalada de privilegios puede tomar muchas, muchas formas, algunos ejemplos son:

- Descifrar los hash de las contraseñas encontradas en el objetivo

- Encontrar un servicio vulnerable o una versión de un servicio que te permita escalar privilegios A TRAVÉS del servicio
Pulverización de contraseñas de credenciales previamente descubiertas (reutilización de contraseñas)

- Uso de credenciales por defecto

- Encontrar claves secretas o claves SSH almacenadas en un dispositivo que permitan pivotar a otra máquina

- Ejecutar scripts o comandos para enumerar la configuración del sistema como 'ifconfig' para encontrar la configuración de red, o el comando 'find / -perm -4000 -type f 2>/dev/null' para ver si el usuario tiene acceso a algún comando que pueda ejecutar como root
Estos son sólo algunos ejemplos de cómo podría funcionar la escalada de privilegios y hay muchas más formas en las que podría tener lugar una escalada de privilegios. Piensa en esta sección de la metodología como llegar a una cuenta de usuario de nivel superior o pivotar a otra máquina con el objetivo final de "poseer" la máquina.

### Informes

La última fase de la metodología del pentest es la fase de informe.

Se trata de una de las fases más importantes, en la que se describe todo lo que se ha encontrado. La fase de informe suele incluir lo siguiente

- Los hallazgos o vulnerabilidades
- La CRÍTICA del hallazgo
- Una descripción o breve resumen de cómo se descubrió el hallazgo
- Recomendaciones de solución para resolver el hallazgo
- La cantidad de documentación del informe varía mucho según el tipo de compromiso en el que participe el pentester. Un informe de hallazgos generalmente tiene tres formatos:

- Resultados del escaneo de vulnerabilidad (una simple lista de vulnerabilidades)
- Resumen de los hallazgos (lista de los hallazgos según lo indicado anteriormente)
- Informe formal completo.

Como ya se ha dicho, hay muchos niveles diferentes de documentación para un informe final escrito. A continuación se muestra cómo sería cada tipo de informe en la práctica:

Un informe de vulnerabilidad suele tener el siguiente aspecto: 

![index](https://images.squarespace-cdn.com/content/v1/5516199be4b05ede7c57f94f/1446545768422-58BN3F2CNKLKMP22FHM4/ke17ZwdGBToddI8pDm48kJ510zKrPqMYDklP4IHY6ghZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIXMtOr48_aO8ZpATxJus3Zikh6e0Sdr9qHJBhZ3Dc8CI/Acunetix%2Bsample%2Breport.png)


``` bash
Un resumen de conclusiones suele ser algo así:
Hallazgo: Inyección SQL en el parámetro ID de la página Cats
Crítica: Crítico
Descripción: La colocación de un payload de 1' OR '1'='1 en el parámetro ID de la página web permitía ver todos los nombres de los gatos en la tabla Cat de la base de datos. Además, una sentencia SQL UNION SELECT permitió al atacante ver todos los nombres de usuario y contraseñas almacenados en la tabla Accounts. 
Recomendación de solución: Utilizar una sentencia SQL preparada para evitar ataques de inyección SQL
```

Se puede encontrar un ejemplo de informe formal completo aquí: https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report.

> ¿Cuál sería el tipo de informe que involucra una documentación completa de todos los hallazgos dentro de un documento formal?  
> Full format report

> ¿Cuál es la otra cosa que un pentester debe proporcionar en un informe más allá: el nombre del hallazgo, la descripción del hallazgo, la criticidad del hallazgo?  
> Remediation recommendation