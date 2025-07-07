import PagamentoQrCode from '@/components/PagamentoQrCode';
import { buscarPedidoPorId } from '@/hooks/buscarPedidoPorId';
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/auth"; 

interface PagamentoProps {
    params: {
        pedidoId: string;
    };
}

export default async function PagamentoPage({ params }: PagamentoProps) {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/login");
    }

    const token = session.user.accessToken; // dependendo de como você guardou

    const pedido = await buscarPedidoPorId(params.pedidoId, token);

    if (!pedido) {
        return <p>Pedido não encontrado ou não autorizado</p>;
    }

    return <PagamentoQrCode pedido={pedido} />;
}