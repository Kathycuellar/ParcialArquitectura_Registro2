int alarma = 9;
int activar_alarma = 2;

void setup() {
  pinMode(alarma, INPUT_PULLUP);
  pinMode(activar_alarma, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(alarma) == 0) {
    Serial.println('H');
    delay(500);
  }

  if (Serial.available() ) {
    char letra = Serial.read();
    //Apagar el boton de  la alarma
    if (letra == 'H') {
      digitalWrite(activar_alarma, HIGH);
    }
    //Encender el boton de la alarma
    else if (letra == 'L') {
      digitalWrite(activar_alarma, LOW);
      }
    }
}
