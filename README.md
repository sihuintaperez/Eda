# Laboratorio 2:
##### Integrantes:
EDWAR JHOEL VARGAS Heehuay</br>
Luis Armando Sihuinta Perez </br>
##### Explciación:
-ret = waitpid(pid,&stat_loc,WUNTRACED); -> se encarga de abrir el archivo hijo.c</br>
-execv("./hijo", argv2); se encarga de reemplezar el codigo por el hijo.Ejecuta el programa indicado por filename</br>

##### Padre.c
Primero el proceso padre , creara al al hijo y el hijo al nieto respectivamente .</br>
,el proceso padre.c se encargara de abrir el hijo.c y esperara a que su hijo y nieto terminen sus procesos primero antes de continuar</br>

##### hijo.c
Al igual que es padre este creara un proceso nieto y enviara señales y esperara a que nieto.c termine 

##### nieto.c
Posee una funcion Handler donde ahi se enviaran las señales que se envien  y se encargara de terminar el proceso.
