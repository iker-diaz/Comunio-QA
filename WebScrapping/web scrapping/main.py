from types import NoneType
import requests
from bs4 import BeautifulSoup
import re
import json



# # # # # # # # # # # # # # # # # # # # # # # #

# función para remover las etiquetas
def remove_tags(html):
 
    # parse html content
    soup = BeautifulSoup(html, "html.parser")
 
    for data in soup(['style', 'script']):
        # Remove tags
        data.decompose()
 
    # return data by retrieving the tag content
    return ' '.join(soup.stripped_strings)
 
# # # # # # # # # # # # # # # # # # # # # # # # # 



# URL del sitio web
player_id_oferta=[]
oferta=[]
player_id = []
player_id_propietario = []
player_name = []
player_name_propietario = []
propietarios = []
split_linea = ""
linea2 = ""
cont_lineas = 0
cont_lineas_propietario = 0
cont_lineas_oferta = 0


# leo el fichero y saco los datos por separado con el metodo split
fichero_nombres = open('web scrapping\\input\\urls.txt','r')
for linea in fichero_nombres:
    split_linea = linea.split("/")
    player_name.append(split_linea[1]) 
    player_id.append(split_linea[0].replace("\n",""))
    cont_lineas+=1
fichero_nombres.close()

fichero_propietarios = open('web scrapping\\input\\propietarios.txt','r')
for linea in fichero_propietarios:
    split_linea = linea.split("/")
    player_id_propietario.append(split_linea[0].replace("\n",""))
    logitud_linea = len(linea)
    linea2 = linea[5:logitud_linea]
    split_linea = linea2.split("'")
    player_name_propietario.append(split_linea[0]) 
    propietarios.append(split_linea[1].replace("\n","")) 
    cont_lineas_propietario += 1
fichero_propietarios.close()

fichero_oferta = open('web scrapping\\input\\OfertaMinima.txt','r')
for linea in fichero_oferta:
    split_linea = linea.split("/")
    oferta.append(split_linea[1])
    player_id_oferta.append(split_linea[0].replace("\n",""))
    cont_lineas_oferta +=1
fichero_oferta.close

lista_datos = []
i = 1
while i <= cont_lineas:

    # gracias al fichero puedo hacer scrapping a todos los jugadores
    url = "https://www.comuniate.com/jugadores/"+player_id[i-1]+"/"+player_name[i-1]
    #url = "https://www.comuniate.com/jugadores/1400/courtois"
    # Realiza una solicitud HTTP para obtener el contenido HTML
    response = requests.get(url)

    # Verifica si la solicitud fue exitosa (código de estado 200)
    if response.status_code == 200:
        # Analiza el contenido HTML con BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        # Recogemos varios datos y transformamos a String por cada jugador
        id_jugador = player_id[i-1]
        nombre_jugador = soup.select_one('#content-left > div:nth-child(1) > div.col-xs-12 > h1 > strong').get_text()
        posicion = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(3) > strong').get_text()
        titular = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(5) > strong').get_text()
        if(titular == "NO"):
            titular = False
        else:
            titular = True 
        fuera_liga = soup.select_one('#content-left > div:nth-child(1) > div.col-xs-12 > div.alert.alert-danger > strong')
        if( type(fuera_liga) != NoneType ):
            fuera_liga = fuera_liga.text
            if( fuera_liga.find("ya no se encuentra")) :
                fuera_liga = 'SI'
            else :
                fuera_liga = 'NO'
        lesionado = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div.col-xs-12 > div')
        lesion = "NO"
        if( type(lesionado) != NoneType ):
            posicion = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(3) > strong').get_text()
            titular = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(5) > strong').get_text()
            if( not lesionado.text.__contains__("FUERA DE LA LISTA")):
                lesion = lesionado.text
    
              

        media_puntos = float(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(2) > div > span:nth-child(1) > strong').get_text())
        media_sofascore= soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(3) > div > span:nth-child(1) > strong')
        if( media_sofascore.get_text() != '' ):
            media_sofascore = float(media_sofascore.get_text())
        else:
            media_sofascore = 0
        equipo = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > img:nth-child(1)')
        nombre_equipo = equipo['title']
        total_puntos = int(soup.select_one("#content-left > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(1) > div > span:nth-child(1) > strong").get_text())
        tarjetas_amarillas = int(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(5)').get_text())
        tarjetas_rojas = int(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(9)').get_text())
        tarjetas_doble_amarilla = int(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(7)').get_text())
        buenos_puntos = 0
        #CARLOS
        partidos_jugados = soup.select_one("#content-left > div:nth-child(2) > div:nth-child(1) > div.row.fondo_stats > div:nth-child(4) > div > span:nth-child(1) > strong").get_text()
        
        # Transformación String
        #partidos =  remove_tags('\n'.join(map(str, partidos_jugados)))
        #lesionado_string =  remove_tags('\n'.join(map(str, lesionado)))

        

        
        #fran
        racha = ""
        precio_max = int(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(8) > div:nth-child(2) > span').get_text().replace("€","").replace(".",""))
        precio_min = int(soup.select_one('#content-left > div:nth-child(2) > div:nth-child(8) > div:nth-child(3) > span').get_text().replace("€","").replace(".",""))
        racha_flecha = soup.select_one('#content-left > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) > span > i')
        racha_class = racha_flecha.get('class')
        if "fa-arrow-up" in racha_class:
           racha = "Buena"
        elif "fa-arrow-right" in racha_class:
            racha = "Normal"
        elif "fa-arrow-down" in racha_class:
            racha = "Mala"
        
        
       
        # Carlos
        ofertaMin = None
        if id_jugador in player_id_oferta:
             linea2 = 0
             
             for h in player_id_oferta:
                if id_jugador in h :
                    index_oferta = player_id_oferta.index(id_jugador)
                    ofertaMin = oferta[index_oferta]
                    break
                else:
                 linea2 +=1
                
                    
                
        print(ofertaMin)    
        
        #Pablo
        propietario = "Computer"
        if id_jugador in player_id_propietario:
            linea = 0
            for posicionID in player_id_propietario:
                if id_jugador in posicionID:
                    break
                else:
                    linea += 1

            propietario = propietarios[linea]
        



        # Transformación String  

       # nombre_string = remove_tags('\n'.join(map(str, nombre_jugador)))


        # Canviamos la url porque ahora miraremos cosas de mercado
        url = "https://www.comuniate.com/mercado/"+player_id[i-1]+"/"+player_name[i-1]
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        precio_jugador = soup.find('td',).findChild().get_text()
        precio_jugador = precio_jugador.replace("€","").replace(".","")
        #Carlos
        #partidos_jugados = soup.select("#content-left > div:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2) > span")
        
        

        #OSCAR
        informacion = soup.find_all('span', { 'class' : 'label label-info'})

        general = str(informacion[0])
        soupR = BeautifulSoup(general, 'html.parser')
        contenido_general = soupR.get_text().split(" ")
        print("Ranking General:", contenido_general[0])

        equipo = str(informacion[1])
        soupR = BeautifulSoup(equipo, 'html.parser')
        contenido_equipo = soupR.get_text().split(" ")
        print("Ranking Equipo:", contenido_equipo[0])

        posicionr = str(informacion[2])
        soupR = BeautifulSoup(posicionr, 'html.parser')
        contenido_posicion = soupR.get_text().split(" ")
        print("Ranking Posición:", contenido_posicion[0])

        urlMF = "https://www.comuniate.com/mercado/"+player_id[i-1]+"/"+player_name[i-1]
        responseMF = requests.get(urlMF)
        soupMF = BeautifulSoup(response.text, 'html.parser')
        
        #if mejor_fichaje_string == nombre_jugador:
        #    mejor_fichaje = True
        #else:
        #    mejor_fichaje = False

        #

        tabla_precios = soup.select('#content-left > div:nth-child(2) > div:nth-child(3) > table')
        tabla_precios_string =  remove_tags('\n'.join(map(str, tabla_precios)))
        tabla_precios_string = re.sub(r'\+\d+\s*días', '', tabla_precios_string).replace("ayer","").replace("€","").replace(".","")
        print(" " , fuera_liga)
        
        #print(fuera_liga)
        

        # Crear una estructura de datos en formato JSON
        print( nombre_jugador , " " , posicion , " " , precio_max , " " , precio_min, " ",
               media_sofascore , " " , media_puntos , " " , total_puntos , " " , precio_min, " ",)
        
        puntos_buenos = None
        datos = {
            "id": id_jugador,
            "nombre":nombre_jugador,
            "propietario":propietario,
            "equipo":nombre_equipo,
            "posicion":posicion,
            "titular":titular,
            "partidos_jugados":partidos_jugados,
            "ranking_general":int(contenido_general[0]),
            "ranking_equipo":int(contenido_equipo[0]),
            "ranking_posicion": int(contenido_posicion[0]),
            # OSCAR "mejor_fichaje":mejor_fichaje,
            "media_sofascore":media_sofascore,
            "media_puntos":media_puntos,
            "total_puntos":total_puntos,
            "puntos_buenos":puntos_buenos,
            "oferta_minima":ofertaMin,
            "valor_mercado": int(precio_jugador),
            "valor_mercado_max":precio_min,
            "valor_mercado_min":precio_max,
            "tarjeta_amarilla":tarjetas_amarillas,
            "tarjeta_roja": tarjetas_rojas,
            "doble_tarjeta_amarilla":tarjetas_doble_amarilla,
            "racha":racha,
            "lesion":lesion
        }
        lista_datos.append(datos)

        # Convertir la estructura de datos a formato JSON   

        print(f"Los datos se han guardado en el archivo'.")

        
    else:
        print("La solicitud no fue exitosa. Código de estado:", response.status_code)

    i+=1
    
    
json_data = json.dumps(lista_datos, indent=4, ensure_ascii=False)  # indent para una presentación más legible

# Guardar el JSON en un archivo

nombre_archivo = "datos.json"

with open(nombre_archivo, "a") as archivo:

    archivo.write(json_data)



urlAPI = "http://10.228.64.253/api/v1/jugadores"

responseAPI = requests.get(urlAPI)

if responseAPI.status_code == 200:
    data = responseAPI.json()
    print("Nombre: ", data["nombre"])

else:
    print("Error en la solicitud:", responseAPI.status_code)
     


