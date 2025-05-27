# Backlog do Produto

## Backlog Geral

O backlog do produto é um repositório vivo e priorizado que reúne todos os requisitos, funcionalidades, melhorias e correções necessárias para o desenvolvimento contínuo do sistema. Ele atua como um guia central para a equipe, orientando o que deve ser feito em cada etapa do projeto. Essa lista é constantemente revisada e atualizada, acompanhando a evolução do produto e respondendo a novas demandas e aprendizados, mantendo o alinhamento entre equipe e objetivos do projeto.
Essa configuração da logística de escrita das histórias de usuários se justifica pelo fato do processo de engenharia selecionada pela equipe: ScrumXP, conforme descrito na seção de [Estratégias de Engenharia de Software](../visaoDoProduto/estrategiasEngSoft.md). Em resumo, os Requisitos Funcionais são detalhados com mais profundidade durante a fase de Sprint Planning, momento em que as histórias de usuário são escritas no formato _"Eu como (agente), gostaria de (ação), para que (agregação de valor)"_.

No centro do backlog estão as User Stories (US), ou histórias de usuário. Elas são descrições simples e objetivas das necessidades dos usuários finais, escritas de forma a serem compreendidas por todos os envolvidos no desenvolvimento. Cada história busca responder a três perguntas principais: quem é o usuário, o que ele quer fazer e qual benefício essa ação traz. Esse modelo garante que o foco se mantenha na entrega de valor real ao usuário.

Algumas histórias, por envolverem um conjunto maior de funcionalidades ou maior complexidade, são agrupadas em Épicos. Um épico representa uma necessidade mais abrangente e, por isso, é dividido em várias histórias menores que detalham os passos necessários para sua implementação. Esse desmembramento facilita o entendimento do escopo e a definição de prioridades dentro do processo iterativo de desenvolvimento.

Além disso, o backlog também está organizado por Temas, que agrupam épicos e histórias com objetivos semelhantes ou pertencentes à mesma área funcional do sistema. Os temas fornecem uma visão macro do produto, contribuindo para uma organização mais estratégica do desenvolvimento e facilitando a priorização por grandes áreas de valor. Ao contrário dos épicos, que possuem um escopo mais específico, os temas são categorias mais amplas que ajudam a estruturar o backlog de forma lógica e coesa.

### Temas

| Código | Título                   | Descrição                                                                                                                                 |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| TM01   | Conta do Usuário e Admin | Funcionalidades para cadastro, autenticação e gerenciamento da conta do usuário e uso do sistema pelo administrador.                      |
| TM02   | Fluxo de Compra          | Funcionalidades para gerenciar e visualizar o catálogo de produtos da doceria e montagem, além do acompanhamento e pagamento dos pedidos. |

---

### Épicos

| Código | Tema | Título                                | User Story                                                                                                                                  |
| ------ | ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| EP01   | TM01 | Cadastro e Autenticação               | Como usuário, quero me cadastrar e autenticar no sistema para acessar minhas funcionalidades pessoais.                                      |
| EP02   | TM01 | Gerenciar Conta de Usuário            | Como usuário autenticado e administrador, quero atualizar meus dados pessoais e acessar o sistema com login seguro para manter minha conta. |
| EP03   | TM02 | Gerenciar Cardápio                    | Como administrador, quero adicionar, editar e remover itens do cardápio para manter o menu atualizado.                                      |
| EP04   | TM02 | Gerenciar Sacola de Compras           | Como cliente, quero adicionar, alterar e remover produtos na sacola para montar meu pedido.                                                 |
| EP05   | TM02 | Finalizar e Acompanhar Pedido         | Como cliente, quero concluir pedidos, realizar encomendas e reservar produtos para garantir minha compra.                                   |
| EP06   | TM02 | Integração e Confirmação de Pagamento | Como cliente e administrador, quero gerar, confirmar e receber notificações sobre pagamentos via PIX para garantir segurança e agilidade.   |

---

### User Stories dos Requisitos Funcionais

| Código | Requisito Funcional Associado | Épico Associado | User Story                                                                                                                                             |
| ------ | ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| US01   | RF12                          | EP01            | Como novo usuário, quero me cadastrar para acessar as funcionalidades do sistema.                                                                      |
| US02   | RF13                          | EP01            | Como usuário, quero autenticar-me para garantir acesso seguro à minha conta.                                                                           |
| US03   | RF11                          | EP02            | Como administrador, quero fazer login seguro no sistema para acessar funcionalidades restritas.                                                        |
| US04   | RF15                          | EP02            | Como usuário autenticado, quero atualizar meus dados pessoais (exceto e-mail) para manter minhas informações atualizadas.                              |
| US05   | RF01                          | EP03            | Como administrador, quero adicionar itens ao cardápio com nome, descrição, preço (por tamanho), quantidade e imagem para manter o cardápio atualizado. |
| US06   | RF02                          | EP03            | Como administrador, quero remover itens do cardápio para retirar produtos indisponíveis ou descontinuados.                                             |
| US07   | RF03                          | EP03            | Como administrador, quero editar itens do cardápio para corrigir ou atualizar informações.                                                             |
| US08   | RF14                          | EP03            | Como cliente, quero visualizar todos os produtos do cardápio com nome, descrição, preços por tamanho e imagem em uma tela responsiva.                  |
| US09   | RF16, RF17                    | EP04            | Como cliente, quero adicionar e remover produtos na sacola de compras para montar meu pedido com controle de quantidade e preços.                      |
| US10   | RF18, RF19                    | EP04            | Como cliente, quero alterar a quantidade dos produtos na sacola de compras para ajustar meu pedido antes da finalização.                               |
| US11   | RF20, RF27                    | EP05            | Como cliente, quero concluir pedidos para finalizar a compra dos produtos selecionados.                                                                |
| US12   | RF21                          | EP05            | Como cliente, quero realizar encomendas de produtos para garantir a disponibilidade futura.                                                            |
| US13   | RF05                          | EP05            | Como administrador, quero visualizar detalhes de um produto para organizar a produção e entrega.                                                       |
| US14   | RF07, RF08, RF10              | EP06            | Como administrador, quero receber notificações e confirmar recebimentos de pagamentos via PIX para controle financeiro da doceria.                     |
| US15   | RF28, RF29                    | EP06            | Como cliente, quero gerar código PIX e visualizar QR Code para poder continuar o meu processo de pagamento de pedido na doceria.                       |
| US16   | RF30, RF31                    | EP06            | Como cliente, quero copiar chave e realizar o pagamento via Pix para concluir o meu pedido na doceria.                                                 |
| US17   | RF32, RF33                    | EP06            | Como cliente, quero confirmar pagamento, receber notificação e visualizar comprovante de pagamento para facilitar transações seguras.                  |

---

### Requisitos Não Funcionais

#### Requisitos de Usabilidade

| **ID** | **Descrição do Requisito de Usabilidade**                                                                                                                                                                                                                                     |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF01  | O sistema deve permitir que usuários localizem facilmente o cardápio, histórico de pedidos e área de login por meio de uma navegação com ícones visuais para melhorar a compreensão, assim até mesmo usuários com pouca familiaridade digital terão facilidade na utilização. |
| RNF02  | A interface deve exibir feedbacks visuais claros ao adicionar ou remover itens da sacola, realizar login ou confirmar pedidos.                                                                                                                                                |
| RNF03  | A interface deve ser responsiva e adaptável a diferentes dispositivos (smartphones, tablets, desktops).                                                                                                                                                                       |
| RNF04  | O sistema deve oferecer instruções claras durante o fluxo de pedido e pagamento.                                                                                                                                                                                              |
| RNF05  | Os botões e elementos interativos devem ser facilmente clicáveis e legíveis em qualquer dispositivo.                                                                                                                                                                          |
| RNF06  | A interface principal deve destacar os principais produtos e promoções, além de facilitar o acesso ao histórico de pedidos e status.                                                                                                                                          |
| RNF07  | O sistema deve ser acessível para usuários com diferentes níveis de habilidade técnica, com botões claros e sem sobrecarga de informações.                                                                                                                                    |
| RNF08  | As cores da interface devem seguir a paleta visual da Bananoffee Doceria, refletindo a identidade da marca, com contraste adequado para legibilidade.                                                                                                                         |
| RNF09  | A tipografia utilizada no sistema deve seguir o padrão visual da marca, priorizando fontes legíveis e consistentes entre as telas.                                                                                                                                            |
| RNF10  | O QR Code do PIX deve ser claramente visível e facilmente escaneável.                                                                                                                                                                                                         |
| RNF11  | O processo de pagamento deve ser intuitivo, com instruções claras sobre como realizar o PIX.                                                                                                                                                                                  |
| RNF12  | O sistema deve exibir o valor do pagamento de forma destacada e clara.                                                                                                                                                                                                        |

#### Requisitos de Confiabilidade

| **ID** | **Descrição do Requisito de Confiabilidade**                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| RNF13  | O sistema deve permitir recuperação automática em caso de queda de conexão durante a finalização do pedido.                         |
| RNF14  | O sistema deve notificar o usuário se algum erro ocorrer durante o processo de pagamento, garantindo que o pedido não seja perdido. |
| RNF15  | A aplicação deve manter os dados dos usuários e pedidos salvos em caso de falhas.                                                   |
| RNF16  | O status dos pedidos deve refletir com precisão as atualizações feitas pelo administrador em tempo real.                            |
| RNF17  | O sistema deve estar disponível pelo menos 99,5% do tempo por mês (uptime), monitorado continuamente.                               |
| RNF18  | O sistema deve manter log de todas as transações PIX para auditoria.                                                                |
| RNF19  | Em caso de falha na geração do PIX, o sistema deve permitir nova tentativa imediatamente.                                           |

#### Requisitos de Suportabilidade

| **ID** | **Descrição do Requisito de Suportabilidade**                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| RNF20  | O sistema deve ser desenvolvido com tecnologias modernas (Next.js, NestJS) para facilitar a manutenção e evolução do código. |
| RNF21  | A aplicação deve seguir uma arquitetura modular para facilitar a adição de novas funcionalidades.                            |
| RNF22  | O sistema deve ter documentação básica que permita a continuidade do desenvolvimento por novos membros da equipe.            |
| RNF23  | O código-fonte deve estar versionado em repositório Git com histórico de mudanças.                                           |
| RNF24  | A base de dados deve permitir consultas eficientes e bem estruturadas com uso de MongoDB.                                    |
| RNF25  | O sistema deve permitir a atualização de categorias e produtos sem necessidade de interrupção do serviço.                    |

#### Requisitos de Segurança

| **ID** | **Descrição do Requisito de Segurança**                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| RNF26  | O sistema deve criptografar senhas dos usuários antes de armazená-las no banco de dados.                                  |
| RNF27  | O login deve utilizar autenticação segura, com tokens JWT para sessões autenticadas.                                      |
| RNF28  | As rotas administrativas devem ser protegidas e acessíveis apenas para usuários autenticados com perfil de administrador. |
| RNF29  | As requisições de pagamento devem ser protegidas com HTTPS e validação de origem confiável.                               |
| RNF30  | O sistema deve expirar automaticamente sessões inativas após 30 minutos.                                                  |
| RNF31  | Deve haver verificação de duplicidade no cadastro para evitar múltiplas contas com o mesmo e-mail.                        |
| RNF32  | O sistema deve gerar códigos PIX únicos e seguros para cada transação.                                                    |
| RNF33  | As informações de pagamento devem ser criptografadas durante a transmissão.                                               |
| RNF34  | O código PIX deve ter validade máxima de 30 minutos após a geração.                                                       |



## Priorização do Backlog Geral

Para a construção da priorização do backlog geral do sistema Bananoffee, a equipe optou por utilizar a técnica **MoSCoW**, como foi dito no processo de [Engenharia de Requisitos](../visaoDoProduto/engenhariaderequisitos.md#analise-e-consenso) no módulo de Análise e Consenso, uma abordagem amplamente reconhecida em metodologias ágeis para definição de prioridades. Essa técnica auxilia no entendimento de quais funcionalidades são realmente essenciais para a entrega do **Mínimo Produto Viável (MVP)** e quais podem ser adiadas para versões futuras do produto.

### Técnica MoSCoW

A técnica MoSCoW categoriza os requisitos em quatro níveis de prioridade:

- **Must Have (M)** – _Deve Ter_: Funcionalidades **obrigatórias** para o sistema funcionar minimamente. Sem elas, o produto não pode ser entregue.
- **Should Have (S)** – _Deveria Ter_: Funcionalidades **importantes**, mas que podem ser adiadas, se necessário. Podem ser incluídas no MVP caso haja tempo.
- **Could Have (C)** – _Poderia Ter_: Funcionalidades **desejáveis**, que agregam valor, mas que não são críticas para o funcionamento básico.
- **Won’t Have (W)** – _Não Terá por agora_: Funcionalidades que **não serão implementadas na versão atual**, mas que podem ser consideradas no futuro.

### Processo de Priorização

A priorização foi feita por meio de reuniões com a equipe de desenvolvimento, considerando também as necessidades do cliente e o escopo do projeto. Foram analisados dois fatores principais:

- **Valor para o negócio e experiência do usuário**, conforme expresso pelo cliente e pelos objetivos do sistema.
- **Viabilidade técnica e esforço estimado**, conforme análise da equipe de desenvolvimento.

A classificação MoSCoW foi aplicada aos **Requisitos Funcionais (RF)** e, em alguns casos, a **Requisitos Não Funcionais (RNF)** considerados essenciais para garantir usabilidade, segurança e operação mínima do sistema.

### Definição do MVP

Com base na priorização MoSCoW, o MVP será composto por todos os requisitos classificados como:

- **Must Have (M)**: Sem exceções.
- Alguns **Should Have (S)**: Desde que não comprometam a entrega no prazo e sejam de baixa complexidade.

Requisitos **Could Have (C)** e **Won’t Have (W)** não farão parte do MVP, mas serão mantidos no backlog para caso haja iterações futuras.

#### Priorização dos Requisitos

A priorização dos requisitos funcionais foi realizada em uma reunião colaborativa envolvendo os principais stakeholders, o Product Owner (PO), a equipe de desenvolvimento e demais envolvidos no projeto. Durante essa sessão, foram discutidas as necessidades do negócio, a viabilidade técnica e o impacto para o usuário final, de modo a definir quais requisitos seriam essenciais (Must Have), importantes (Should Have), desejáveis (Could Have) ou que poderiam ser descartados por enquanto (Won’t Have). Essa priorização orienta o desenvolvimento incremental do sistema, garantindo foco no que agrega maior valor ao produto no menor tempo possível.

#### Requisitos Funcionais para o Administrador

| ID   | Descrição                                                   | Prioridade  | MVP |
| ---- | ----------------------------------------------------------- | ----------- | --- |
| RF01 | Adicionar um item no cardápio digital                       | Must Have   | X   |
| RF02 | Excluir um item no cardápio digital                         | Must Have   | X   |
| RF03 | Alterar um item no cardápio digital                         | Must Have   | X   |
| RF04 | Alterar o status de um pedido                               | Won’t Have  |     |
| RF05 | Visualizar um pedido                                        | Must Have   | X   |
| RF06 | Receber uma notificação sobre um pedido via SMS ou WhatsApp | Could Have  |     |
| RF07 | Receber notificação de pagamento realizado                  | Should Have | X   |
| RF08 | Confirmar recebimento do pagamento PIX                      | Should Have | X   |
| RF09 | Visualizar relatório de pagamentos recebidos                | Won’t Have  |     |
| RF10 | Gerenciar chave PIX da doceria                              | Must Have   | X   |
| RF11 | Ter uma conta já cadastrada no sistema                      | Must Have   | X   |


#### Requisitos Funcionais para o Usuário

| ID   | Descrição                                                 | Prioridade  | MVP |
| ---- | --------------------------------------------------------- | ----------- | --- |
| RF12 | Se cadastrar no sistema                                   | Must Have   | X   |
| RF13 | Realizar a autenticação no sistema                        | Must Have   | X   |
| RF14 | Visualizar o cardápio digital                             | Must Have   | X   |
| RF15 | Gerenciar sua conta de usuário                            | Must Have   | X   |
| RF16 | Adicionar produtos na sacola virtual de compras           | Must Have   | X   |
| RF17 | Remover os produtos da sacola virtual                     | Must Have   | X   |
| RF18 | Inserir os produtos da sacola virtual                     | Must Have   | X   |
| RF19 | Alterar os produtos da sacola virtual                     | Must Have   | X   |
| RF20 | Concluir seu pedido                                       | Must Have   | X   |
| RF21 | Realizar encomenda de produtos                            | Should Have | X   |
| RF22 | Reservar um produto                                       | Could Have  |     |
| RF23 | Acompanhar o status do pedido                             | Won’t Have  |     |
| RF24 | Visualizar seu histórico de pedidos                       | Could Have  |     |
| RF25 | Ganhar pontos de fidelidade por pedido                    | Could Have  |     |
| RF26 | Avaliar um pedido                                         | Won’t Have  |     |
| RF27 | Visualizar o valor total do pedido antes de finalizar     | Must Have   | X   |
| RF28 | Gerar código PIX para pagamento do pedido                 | Must Have   | X   |
| RF29 | Visualizar QR Code do PIX para pagamento                  | Must Have   | X   |
| RF30 | Copiar código PIX (chave aleatória) para pagamento manual | Must Have   | X   |
| RF31 | Efetuar o pagamento via PIX                               | Must Have   | X   |
| RF32 | Confirmar o pagamento realizado via PIX                   | Must Have   | X   |
| RF33 | Receber notificação de confirmação de pagamento           | Should Have | X   |
| RF34 | Visualizar comprovante de pagamento no histórico          | Won’t Have  |     |



# Referências Bibliográficas:

- PRESSMAN, Roger S. Engenharia de Software: Uma Abordagem Profissional. 7ª ed. São Paulo: McGraw Hill, 2011.

- RUBIN, Kenneth S. Scrum Essencial: Um Guia Prático para o Processo Ágil Mais Popular. São Paulo: Alta Books, 2014.

- SCHWABER, Ken; SUTHERLAND, Jeff. Guia do Scrum: O Guia Definitivo para o Scrum, as Regras do Jogo. Scrum.org, 2020.

- CAROLI, Paulo. Lean Inception: Como Alinhar Pessoas e Construir o Produto Certo. São Paulo: Caroli.org, 2018.

- RIES, Eric. A Startup Enxuta: Como os Empreendedores Atuais Utilizam a Inovação Contínua para Criar Empresas Extremamente Bem-Sucedidas. Rio de Janeiro: Alta Books, 2012.

---
## Histórico de Versão:
| Data     | Versão | Descrição                                      | Autor      |
| -------- | ------ | ---------------------------------------------- | ---------- |
| 25/05/25 | 1.0    | Criação do Documento e adição do Backlog Geral | Bruno Cruz |