import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class LeybotGtApp extends JFrame {
    private JTextField userInputField;
    private JTextPane responsePane;

    public LeybotGtApp() {
        // Configurar el título de la página
        setTitle("LeybotGt");

        // Título de la aplicación
        JLabel titleLabel = new JLabel("Preguntas de Legislación Guatemalteca");
        add(titleLabel, BorderLayout.NORTH);

        // Campo de entrada de usuario
        userInputField = new JTextField();
        add(userInputField, BorderLayout.CENTER);

        // Botón de enviar solicitud
        JButton submitButton = new JButton("Enviar solicitud");
        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                sendRequest();
            }
        });
        add(submitButton, BorderLayout.SOUTH);

        // Área de respuesta
        responsePane = new JTextPane();
        responsePane.setContentType("text/html");
        JScrollPane responseScrollPane = new JScrollPane(responsePane);
        add(responseScrollPane, BorderLayout.EAST);

        pack();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }

    private void sendRequest() {
        String apiKey = "fcbfdfe8-e9ed-41f3-a7d8-b6587538e84e";
        String sessionID = "65489d7c9ad727940f2ab26f";
        String userInput = userInputField.getText();

        try {
            // Construir el cuerpo de la solicitud
            String payload = "{\"apiKey\": \"" + apiKey + "\", \"sessionID\": \"" + sessionID + "\", \"history\": [{\"role\": \"user\", \"content\": \"" + userInput + "\"}], \"powerful\": false, \"google\": true}";

            // URL de la API
            URL url = new URL("https://api.afforai.com/api/api_completion");

            // Abrir la conexión HTTP
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            // Enviar la solicitud POST
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
            writer.write(payload);
            writer.flush();

            // Leer la respuesta
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            // Cerrar las conexiones
            writer.close();
            reader.close();
            connection.disconnect();

            // Mostrar respuesta en el JTextPane
            responsePane.setText(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error en la solicitud: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new LeybotGtApp();
            }
        });
    }
}
