import { render, screen } from "../../test-utils";
import { fireEvent } from "@testing-library/react";
import Cita from "./Cita";

describe("<Cita />", () => {
  test("Renderizar componente cita", () => {
    render(<Cita />);
    const inputAutor = screen.getByPlaceholderText(
      /Ingresa el nombre del autor/i
    );
    const textHeader = screen.getByText(/No se encontro ninguna cita/i);
    const buttonCita = screen.getByLabelText(/Obtener cita aleatoria/i);
    const buttonBorrar = screen.getByLabelText(/Borrar/i);
    expect(inputAutor).toBeInTheDocument();
    expect(textHeader).toBeInTheDocument();
    expect(buttonCita).toBeInTheDocument();
    expect(buttonBorrar).toBeInTheDocument();
  });

  test("Renderizar CARGANDO", async () => {
    render(<Cita />);
    const inputAutor = screen.getByPlaceholderText(
      /Ingresa el nombre del autor/i
    );
    fireEvent.change(inputAutor, { target: { value: "Abe Simpson" } });
    const buttonCita = screen.getByLabelText(/Obtener cita/i);
    fireEvent.click(buttonCita);
    const cargando = await screen.findByText(/CARGANDO.../i);
    expect(cargando).toBeInTheDocument();
  });

  test("Buscar cita con personaje", async () => {
    render(<Cita />);
    const inputAutor = screen.getByPlaceholderText(
      /Ingresa el nombre del autor/i
    );
    fireEvent.change(inputAutor, { target: { value: "Abe Simpson" } });
    const buttonCita = screen.getByLabelText(/Obtener cita/i);
    fireEvent.click(buttonCita);
    const autorCita = await screen.findByText(
      "Abe Simpson",
      {},
      { timeout: 3000 }
    );
    expect(autorCita).toBeInTheDocument();
  });
});
