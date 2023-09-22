import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Pablo_Castillo_Mesa {

  // Instanciar acciones/condiciones
  public static String testId;
  WebDriver driver;
  
  private static Pablo_Castillo_Mesa home_instance = null;

  // Instanciar clases de test con patrón Singleton
  public static Pablo_Castillo_Mesa setInstance() {
    if (home_instance == null) {
      home_instance = new Pablo_Castillo_Mesa();
    }
    return home_instance;
  }

  @BeforeMethod
  public void setup_test() throws Exception {

    System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
		ChromeOptions chromeOptions = new ChromeOptions();
    chromeOptions.addArguments("start-maximized");
    chromeOptions.addArguments("--log-level=1");
		driver = new ChromeDriver(chromeOptions);
  }

  @AfterMethod
  public void breakup_test() throws Exception {
    // Cerrar el navegador
    driver.quit();
  }

  @Test(description = "Login_TC01", enabled = true)

   public void Login_TC01() throws InterruptedException {
    driver.get("https://www.comunio.es");

    if (driver.findElements(By.xpath("//div[@id='qc-cmp2-ui']")).size() > 0) {
      driver.findElement(By.xpath("//button[@mode='primary']")).click();
    }

    //Assert.assertTrue(driver.findElements(By.xpath("//li[@id='item-0']/span[contains(text(),'Text Box')]")).size() > 0);
    Thread.sleep(2000);

    driver.findElement(By.xpath("//a[@class='login-btn registration-btn-fill']/span")).click();

    Thread.sleep(1000);

    driver.findElement(By.xpath("//input[@id='input-login']")).sendKeys("eldiabl"); ////////////////////////// CAMBIAR USUARIO EN SEPTIEMBRE

    driver.findElement(By.xpath("//input[@id='input-pass']")).sendKeys("12345678"); //////////////////////// CAMBIAR CONTRASEÑA EN SEPTIEMBRE

    Thread.sleep(1000);

    driver.findElement(By.xpath("//a[@id='login-btn-modal']")).click();
 

  }

  @Test(description = "GOTOMERCADO_TC02", enabled = true)

   public void GoToMercado_TC02() throws InterruptedException {

    WebDriverWait wait = new WebDriverWait(driver, 5);

 

    // PRECONDICION

    Login_TC01();

 

    // PASO 1

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@title='Mercado']")));

    driver.findElement(By.xpath("//a[@title='Mercado']")).click();

 

  }


  //Prueba Programa
  @Test(description = "GETNAME&IDMARKETPLAYERS_TC05", enabled = true)

  // Automatización que recogera las URL de todos los jugadores del mercado para sacar a traves de ella el nombre y

  // id para despues pasarlos a un fichero de texto que utilizaremos para otro programa de web scrapping

   public void GetNameAndIdPlayers_TC05() throws InterruptedException, IOException {

      WebDriverWait wait = new WebDriverWait(driver, 10);

      FileWriter fichero = new FileWriter(new File("web scrapping/input/urls.txt"),true);

      JavascriptExecutor js = (JavascriptExecutor) driver;

 

    // PASO 1 -- Ir comuniate

    driver.get("https://www.comuniate.com/jugadores/comunio");

    Thread.sleep(1000);

    driver.findElement(By.xpath("//button[@class=' css-qctjav']")).click();

 

    // PASO 2 -- Pillar Nombre y Id Player a traves del href

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id='content-left']")));

    List<WebElement> urlPlayer = driver.findElements(By.xpath("//div[@class='texto_pequenio2']/a"));

 

    //Paso 3 - Scrollear hasta abajo y clicar siguiente pagina

    WebElement element = driver.findElement(By.xpath("//ul[@class='pagination']/li[last()]/a"));

    WebElement lengthPaginas = driver.findElement(By.xpath("//ul[@class='pagination']/li[position() = (last()-1)]/a"));

    js.executeScript("arguments[0].scrollIntoView();", element);

    js.executeScript("window.scrollBy(0,-200)", "");

    int lengthPaginasInt = Integer.parseInt(lengthPaginas.getText());

    for (int i = 0; i < lengthPaginasInt; i++) {

      for (WebElement webElement : urlPlayer) {

        fichero.write(webElement.getAttribute("href").substring(36) + "\n");

      }

      element = driver.findElement(By.xpath("//ul[@class='pagination']/li[last()]/a"));

      wait.until(ExpectedConditions.visibilityOf(element)).click();

      urlPlayer = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("//div[@class='texto_pequenio2']/a")));

      Thread.sleep(5000);

    }

 

    fichero.close();

   

  }


  //Prueba Programa
  @Test(description = "GETNAME&OWNER_TC06", enabled = true)

  // Automatización que recogera las URL de todos los jugadores del mercado para sacar a traves de ella el nombre y

  // id para despues pasarlos a un fichero de texto que utilizaremos para otro programa de web scrapping

   public void GetNameAndOwner_11_TC06() throws InterruptedException, IOException {

      WebDriverWait wait = new WebDriverWait(driver, 10);

      FileWriter fichero = new FileWriter(new File("web scrapping/input/propietarios.txt"),true);
 

    // PASO 1 -- Ir comuniate

    driver.get("https://www.comuniate.com/comunidad.php");

    driver.findElement(By.xpath("//button[@class=' css-qctjav']")).click();

 

    // PASO 2 -- Pillar Nombre y Id Player a traves del href

    driver.findElement(By.xpath("//*[@id='login']")).sendKeys("eldiabl");
  
    driver.findElement(By.xpath("//*[@id='password']")).sendKeys("12345678");

    driver.findElement(By.xpath("//*[@id='content-left']/div[1]/div[1]/form/div[2]/button")).click();

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='contenedor_comunidad']/div[2]")));

    int participantes = 0;
    for (int a = 1 ; a != 17 ; a++) {
      try {
        if (driver.findElements(By.xpath("//*[@id='contenedor_comunidad']/div[2]/a[" + a + "]/div/div/span/strong")).size() > 0) {
          participantes += 1;
        }
      } catch (NoSuchElementException e) {
        break;
      }
    }
    
    for (int i = 1 ; i != (participantes + 1) ; i++) {
      try {
        String propietario = driver.findElement(By.xpath("//*[@id='contenedor_comunidad']/div[2]/a[" + i + "]/div/div/span/strong")).getText();
        driver.findElement(By.xpath("//*[@id='contenedor_comunidad']/div[2]/a[" + i + "]")).click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='alineacion']/div/div/div[1]")));
        List<WebElement> jugadores = driver.findElements(By.xpath("//*[@id='alineacion']/div/div/div"));
        for (WebElement jugador : jugadores) {
          System.out.println(jugador.getAttribute("onclick").substring(51));
          fichero.write(jugador.getAttribute("onclick").substring(51) + propietario + "\n");
        }
        driver.findElement(By.xpath("//*[@id='alineacion']/div/div/button")).click();
      } catch (NoSuchElementException e) {
        break;
      }
      
    }


    Thread.sleep(5000);

    

 

    fichero.close();

   

  }
  
  @Test(description = "OfertaMinima", enabled = true)
  
  public void ofertaMinima() throws InterruptedException, IOException {
    WebDriverWait wait = new WebDriverWait(driver, 10);
    FileWriter fichero1 = new FileWriter(new File("web scrapping/input/OfertaMinima.txt"), true);

    JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

    Login_TC01();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//a[@title='Mercado']")).click();

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//market-list")));

    List<WebElement> ofertaMinima = driver.findElements(By.xpath("//div[@class='csspt-row']"));
    Thread.sleep(1000);

    for (WebElement ofer : ofertaMinima) {

      jsExecutor.executeScript(
          "arguments[0].scrollIntoView({ behavior:\"smooth\", block: \"center\",inline: \"center\"});", ofer);

      WebElement url_jug = ofer.findElement(By.cssSelector(".csspt-name"));
      String ofertaMin = ofer.findElement(By.cssSelector(".csspt-price")).getText();
      ofertaMin = ofertaMin.replace(".", "");
      int ofertaM = Integer.parseInt(ofertaMin);
      String url_juga = url_jug.getAttribute("href");
      int url = url_juga.lastIndexOf("-");
      if (url != -1) {
        // Extrae la parte de la URL que contiene el número
        String numberString = url_juga.substring(url + 1);

        System.out.println(Integer.parseInt(numberString) + "/" + ofertaM);
        fichero1.write(Integer.parseInt(numberString) + "/" + ofertaM + "\n");

      }

    }
    fichero1.close();

  }
   
  
  
  // @Test(description = "MejorFichaje", enabled = true)
  // public void mejorFichaje() throws InterruptedException, IOException {
  //    driver.get("https://www.comuniate.com/mercado.php");
  //     FileWriter fichero = new FileWriter(new File("input/mejorFichaje.txt"),true);


  //   Thread.sleep(2000);

  //   WebElement cookies = driver.findElement(By.xpath("//*[@id=\"qc-cmp2-ui\"]/div[2]/div/button[2]"));
  //   cookies.click();

  //   WebElement usuari = driver.findElement(By.xpath("//*[@id=\"login\"]"));
  //   WebElement contrasenya = driver.findElement(By.xpath("//*[@id=\"password\"]"));

  //   usuari.sendKeys("eldiabl");
  //   contrasenya.sendKeys("12345678");

  //   WebElement boton = driver.findElement(By.xpath("//*[@id=\"content-left\"]/div[1]/div[1]/form/div[2]/button"));
  //   boton.click();

  //   Thread.sleep(3000);

  //   WebElement mejorFichaje = driver
  //       .findElement(By.cssSelector("#contenedor_comunidad > div:nth-child(2) > div > div.texto_pequenio2 > a"));
  //   String mejorFicha = mejorFichaje.getAttribute("href");
  //   Pattern pattern = Pattern.compile("/(\\d+)/");
  //   Matcher matcher = pattern.matcher(mejorFicha);

  //   // Buscar el número en la URL
  //   if (matcher.find()) {
  //     String numeroString = matcher.group(1);

  //     // Convertir el número a entero
  //     int numero = Integer.parseInt(numeroString);

  //     // Imprimir el número
  //     System.out.println(numero);
  //     fichero.write(numero+"\n");
     

  //   }
  //    fichero.close();

  // }

  

}




  





  

