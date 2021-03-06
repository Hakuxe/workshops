import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [createSubscriber, {loading}] = useCreateSubscriberMutation();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		await createSubscriber({
			variables: { name, email },
		});

		navigate("/event")
	}

	// const [formData, setFormData] = useState({ name: "", email: "" });
	// function handleChange(event: any) {
	// 	const { name, value, checked, type } = event.target;
	// 	const valueInput = type === "checkbox" ? checked : value;

	// 	setFormData((prevState) => {
	// 		return {
	// 			...prevState,
	// 			[name]: valueInput,
	// 		};
	// 	});
	// }

	return (
		<div className="min-h-screen bg-imgBlur bg-cover bg-no-repeat flex flex-col items-center">
			<section className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
				<div className="max-w-[640px]">
					<Logo />
					<h1 className="mt-8 text-[2.5rem] leading-tight">
						Construa uma
						<strong className="text-blue-500"> aplicação completa</strong>
						, do zero, com
						<strong className="text-blue-500"> React</strong>
					</h1>
					<p className="mt-4 text-gray-200 leading-relaxed">
						Em apenas uma semana você vai dominar na prática uma das
						tecnologias mais utilizadas e com alta demanda para acessar as
						melhores oportunidades do mercado.
					</p>
				</div>

				<div className="p-8 bg-gray-700 border border-gray-500 rounded">
					<strong className="text-2xl mb-6 block">
						Inscreva-se gratuitamente
					</strong>

					<form
						onSubmit={(event) => handleSubmit(event)}
						className="flex flex-col gap-2 w-full"
					>
						<input
							className="bg-gray-900 rounded px-5 h-14"
							type="text"
							value={name}
							placeholder="Seu nome completo"
							onChange={(event) => setName(event.target.value)}
						/>
						<input
							className="bg-gray-900 rounded px-5 h-14"
							type="text"
							value={email}
							placeholder="Digite seu e-mail"
							onChange={(event) => setEmail(event.target.value)}
						/>

						<button
							className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
							disabled={loading}
							type="submit"
						>
							Garantir minha vaga
						</button>
					</form>
				</div>
			</section>
			<img src="/src/assets/print-code.png" alt="" />
		</div>
	);
}
