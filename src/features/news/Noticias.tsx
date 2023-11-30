import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

// Principio de Responsabilidad Única (SRP - Single Responsibility Principle).

// Se crean funciones separadas para las responsabilidades clave

// Función para normalizar los datos de las noticias
const normalizeNewsData = (newsData: any[]): INoticiasNormalizadas[] => {
  return newsData.map((n) => {
    // Lógica de normalización de datos
    // ...
    const titulo = n.titulo
      .split(" ")
      .map((str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");

    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
      (ahora.getTime() - n.fecha.getTime()) / 60000
    );

    const normalizedNewsItem = {
      id: n.id,
      titulo,
      descripcion: n.descripcion,
      fecha: `Hace ${minutosTranscurridos} minutos`,
      esPremium: n.esPremium,
      imagen: n.imagen,
      descripcionCorta: n.descripcion.substring(0, 100),

    }
    return normalizedNewsItem;
  });
};

// Función para obtener noticias desde la fuente de datos
const fetchNews = async (): Promise<INoticiasNormalizadas[]> => {
  try {
    const respuesta = await obtenerNoticias();
    const data = normalizeNewsData(respuesta);
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener noticias:", error);
    return [];
  }
};

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const data = await fetchNews();
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

return (
  <ContenedorNoticias>
    <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
    <ListaNoticias>
      {noticias.map((n) => (
        <TarjetaNoticia>
          <ImagenTarjetaNoticia src={n.imagen} />
          <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
          <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
          <DescripcionTarjetaNoticia>
            {n.descripcionCorta}
          </DescripcionTarjetaNoticia>
          <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
        </TarjetaNoticia>
      ))}
      {modal ? (
        modal.esPremium ? (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
              <CotenedorTexto>
                <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                <DescripcionModal>
                  Suscríbete a nuestro newsletter y recibe noticias de
                  nuestros personajes favoritos.
                </DescripcionModal>
                <BotonSuscribir
                  onClick={() =>
                    setTimeout(() => {
                      alert("Suscripto!");
                      setModal(null);
                    }, 1000)
                  }
                >
                  Suscríbete
                </BotonSuscribir>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        ) : (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={modal.imagen} alt="news-image" />
              <CotenedorTexto>
                <TituloModal>{modal.titulo}</TituloModal>
                <DescripcionModal>{modal.descripcion}</DescripcionModal>
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        )
      ) : null}
    </ListaNoticias>
  </ContenedorNoticias>
);
};

export default Noticias;
