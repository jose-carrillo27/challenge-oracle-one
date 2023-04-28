import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

// encriptado de texto con nextjs y bootstrap

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"

export default function Home() {
  // estados
  const [mensaje, setMensaje] = useState("");
  const [mensajeEncrip, setMensajeEncrip] = useState("");
  const [estado, setEstado] = useState(true);

  const handleChange = (e) => {
    setMensaje(e.target.value);
  };

  // funcion encriptadora

  const handleClickEncriptar = () => {
    //estado para cambiar de imagen a textarea al hacer click
    if (!mensaje) {
      setEstado(true);
    } else {
      setEstado(false);
    }

    let nuevoMensaje = "";
    //comprobar si el mensaje contiene alguna vocal
    if (
      mensaje.includes("a") ||
      mensaje.includes("e") ||
      mensaje.includes("i") ||
      mensaje.includes("0") ||
      mensaje.includes("u")
    ) {
      // bucle for que lee el mensaje caracter por caracter y si encuentra alguna coincidencia remplaza el caracter por la cadena correspondiente
      for (let i = 0; i <= mensaje.length; i++) {
        switch (mensaje[i]) {
          case "a":
            nuevoMensaje = nuevoMensaje + mensaje[i].replace("a", "ai");
            break;
          case "e":
            nuevoMensaje = nuevoMensaje + mensaje[i].replace("e", "enter");
            break;
          case "i":
            nuevoMensaje = nuevoMensaje + mensaje[i].replace("i", "imes");
            break;
          case "o":
            nuevoMensaje = nuevoMensaje + mensaje[i].replace("o", "ober");
            break;
          case "u":
            nuevoMensaje = nuevoMensaje + mensaje[i].replace("u", "ufat");
            break;

          default:
            nuevoMensaje = nuevoMensaje + mensaje[i];
            break;
        }
      }
      // al final de cada oracion la funcion esta concatenando "undefined" por lo que hacemos un ultimo replace para limpiar la oracion
      setMensajeEncrip(nuevoMensaje.replace("undefined", ""));
    } else {
      setMensajeEncrip(mensaje);
    }
  };

  // ya existe un estado en la aplicacion con el valor original de la oracion por lo que para desencriptar es tan simple como setear setMensajeEncrip con el valor original

  const handleDesencriptar = () => {
    setMensajeEncrip(mensaje);
  };

  //por ultimo copiar el value del textarea al hacer click en un boton

  const handleCopiar = () => {
    const textArea = document.getElementById("copiar");
    textArea.select();
    document.execCommand("copy");
  };

  return (
    <>
      <Head>
        <title>Encriptador de texto</title>
      </Head>
      <main className={styles.main}>
        <div className="col-12 col-sm-12 col-md-8 col-lg-8">
          <Image
            className={styles.img}
            src="/Vector.svg"
            alt="vector"
            width={31}
            height={48}
          />
          <div className={styles.caja1}>
            <textarea
              className={styles.encriptarAqui}
              onChange={handleChange}
            ></textarea>

            <button
              className={styles.btnEncriptar}
              onClick={handleClickEncriptar}
            >
              Encriptar
            </button>
            <button
              className={styles.btnDesencriptar}
              onClick={handleDesencriptar}
            >
              Desencriptar
            </button>
          </div>
        </div>
        {estado ? (
          <div className={`${styles.caja2} col-12 col-sm-12 col-md-3 col-lg-3`}>
            <div>
              <p className={styles.mensaje}>Ningun mensaje fue encontrado</p>
              <p className={styles.mensaje}>
                Ingresa el texto que desees encriptar o esencriptar
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`${styles.caja2Click} col-12 col-sm-12 col-md-3 col-lg-3`}
          >
            <textarea
              id="copiar"
              className={styles.encriptado}
              value={mensajeEncrip}
            ></textarea>
            <button className={styles.btnCopiar} onClick={handleCopiar}>
              Copiar
            </button>
          </div>
        )}
      </main>
    </>
  );
}
