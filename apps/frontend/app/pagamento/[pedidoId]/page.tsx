import PagamentoQrCode from '../../../components/PagamentoQrCode';
import { buscarPedidoPorId } from '../../../hooks/buscarPedidoPorId';
import { redirect } from "next/navigation";
import { getServerAuthSession } from "../../../lib/auth";

export default async function PagamentoPage({ params }: { params: Promise<{ pedidoId: string }> }) {
    const resolvedParams = await params;
    const pedidoId = resolvedParams.pedidoId;

    const session = await getServerAuthSession();

    if (!session) {
        redirect("/login");
    }

    const token = session.user.accessToken;

    const pedido = await buscarPedidoPorId(pedidoId, token);

    if (!pedido) {
        return <p>Pedido não encontrado ou não autorizado</p>;
    }

    return <PagamentoQrCode pedido={pedido} />;
}