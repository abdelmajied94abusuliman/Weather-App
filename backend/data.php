<?php
$apiKey = 'bcccf97ee81569f154cff44876a79952';
$baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

$city = isset($_GET['city']) ? $_GET['city'] : '';

if ($city === '') {
    echo json_encode(['error' => 'Please provide a city.']);
    exit();
}

$apiUrl = "{$baseUrl}?q={$city}&appid={$apiKey}&units=metric";

$response = @file_get_contents($apiUrl);

if ($response === false) {
    echo json_encode(['error' => 'Failed to connect to the weather service.']);
    exit();
}

$data = json_decode($response, true);

if (isset($data['cod']) && $data['cod'] == '404') {
    echo json_encode(['error' => 'City not found.']);
    exit();
}

if (!isset($data['main'], $data['wind'], $data['weather'][0]['description'], $data['weather'][0]['icon'])) {
    echo json_encode(['error' => 'Weather data incomplete.']);
    exit();
}

echo json_encode([
    'country' => $data['sys']['country'],
    'temperature' => $data['main']['temp'],
    'pressure' => $data['main']['pressure'],
    'humidity' => $data['main']['humidity'],
    'wind' => $data['wind']['speed'],
    'description' => $data['weather'][0]['description'],
    'icon' => $data['weather'][0]['icon']
]);
