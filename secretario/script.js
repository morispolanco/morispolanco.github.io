import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SpellApiExample {

    public static void main(String[] args) throws IOException {
        // URL de la API
        URL url = new URL("https://api.respell.ai/v1/run");
    
        // Crea una conexión
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    
        // Establece el método POST
        connection.setRequestMethod("POST");
    
        // Establece los encabezados de la solicitud
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Authorization", "Bearer 260cee54-6d54-48ba-92e8-bf641b5f4805");
        connection.setRequestProperty("Content-Type", "application/json");
    
        // Habilita el envío y recepción de datos
        connection.setDoOutput(true);
        connection.setDoInput(true);
    
        // Crea el cuerpo de la solicitud
        String requestBody = "{\n" +
                "  \"spellId\": \"qPnyGRPqmYt7xjSLRX8t_\",\n" +
                "  \"spellVersionId\": \"ulAKJd58ZYWMorqDCBSy_\",\n" +
                "  \"inputs\": {\n" +
                "    \"input\": \"Example text\"\n" +
                "  }\n" +
                "}";
    
        // Envía la solicitud
        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(requestBody.getBytes());
        outputStream.flush();
    
        // Obtiene la respuesta
        int responseCode = connection.getResponseCode();
    
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
    
            while ((inputLine = bufferedReader.readLine()) != null) {
                response.append(inputLine);
            }
    
            bufferedReader.close();
    
            // Procesa la respuesta JSON
            System.out.println(response.toString());
        } else {
            System.out.println("Error en la solicitud. Código de respuesta: " + responseCode);
        }
    
        // Cierra la conexión
        connection.disconnect();
    }
}
