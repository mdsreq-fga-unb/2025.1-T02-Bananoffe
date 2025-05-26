# Backlog do Produto

## Backlog Geral

O backlog do produto é um repositório vivo e priorizado que reúne todos os requisitos, funcionalidades, melhorias e correções necessárias para o desenvolvimento contínuo do sistema. Ele atua como um guia central para a equipe, orientando o que deve ser feito em cada etapa do projeto. Essa lista é constantemente revisada e atualizada, acompanhando a evolução do produto e respondendo a novas demandas e aprendizados, mantendo o alinhamento entre equipe e objetivos do projeto.
Essa configuração da logística de escrita das histórias de usuários se justifica pelo fato do processo de engenharia selecionada pela equipe: ScrumXP, conforme descrito na seção de [Estratégias de Engenharia de Software](../visaoDoProduto/estrategiasEngSoft.md). Em resumo, os Requisitos Funcionais são detalhados com mais profundidade durante a fase de Sprint Planning, momento em que as histórias de usuário são escritas no formato _"Eu como (agente), gostaria de (ação), para que (agregação de valor)"_.

No centro do backlog estão as User Stories (US), ou histórias de usuário. Elas são descrições simples e objetivas das necessidades dos usuários finais, escritas de forma a serem compreendidas por todos os envolvidos no desenvolvimento. Cada história busca responder a três perguntas principais: quem é o usuário, o que ele quer fazer e qual benefício essa ação traz. Esse modelo garante que o foco se mantenha na entrega de valor real ao usuário.

Algumas histórias, por envolverem um conjunto maior de funcionalidades ou maior complexidade, são agrupadas em Épicos. Um épico representa uma necessidade mais abrangente e, por isso, é dividido em várias histórias menores que detalham os passos necessários para sua implementação. Esse desmembramento facilita o entendimento do escopo e a definição de prioridades dentro do processo iterativo de desenvolvimento.

Além disso, o backlog também está organizado por Temas, que agrupam épicos e histórias com objetivos semelhantes ou pertencentes à mesma área funcional do sistema. Os temas fornecem uma visão macro do produto, contribuindo para uma organização mais estratégica do desenvolvimento e facilitando a priorização por grandes áreas de valor. Ao contrário dos épicos, que possuem um escopo mais específico, os temas são categorias mais amplas que ajudam a estruturar o backlog de forma lógica e coesa.

### Temas

| Código | Título                      | Descrição                                                                                                            |
| ------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| TM01   | Conta do Usuário e Admin    | Funcionalidades para cadastro, autenticação e gerenciamento da conta do usuário e uso do sistema pelo administrador. |
| TM02   | Cardápio                    | Funcionalidades para gerenciar e visualizar o catálogo de produtos da doceria.                                       |
| TM03   | Pedidos, Sacola e Pagamento | Funcionalidades para montagem, acompanhamento e pagamento dos pedidos.                                               |

---

### Épicos

| Código | Tema | Título                                | User Story                                                                                                                                  |
| ------ | ---- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| EP01   | TM01 | Cadastro e Autenticação               | Como usuário, quero me cadastrar e autenticar no sistema para acessar minhas funcionalidades pessoais.                                      |
| EP02   | TM01 | Gerenciar Conta de Usuário            | Como usuário autenticado e administrador, quero atualizar meus dados pessoais e acessar o sistema com login seguro para manter minha conta. |
| EP03   | TM02 | Gerenciar Cardápio                    | Como administrador, quero adicionar, editar e remover itens do cardápio para manter o menu atualizado.                                      |
| EP04   | TM03 | Gerenciar Sacola de Compras           | Como cliente, quero adicionar, alterar e remover produtos na sacola para montar meu pedido.                                                 |
| EP05   | TM03 | Finalizar Pedido e Reservas           | Como cliente, quero concluir pedidos, realizar encomendas e reservar produtos para garantir minha compra.                                   |
| EP06   | TM03 | Acompanhar e Gerenciar Pedidos        | Como cliente e administrador, quero acompanhar o status dos pedidos para manter controle e organização.                                     |
| EP07   | TM03 | Integração e Confirmação de Pagamento | Como cliente e administrador, quero gerar, confirmar e receber notificações sobre pagamentos via PIX para garantir segurança e agilidade.   |

---

### User Stories dos Requisitos Funcionais

| Código | Requisito Funcional Associado | Épico Associado | User Story                                                                                                                                             |
| ------ | ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| US01   | RF13                          | EP01            | Como novo usuário, quero me cadastrar para acessar as funcionalidades do sistema.                                                                      |
| US02   | RF14                          | EP01            | Como usuário, quero autenticar-me para garantir acesso seguro à minha conta.                                                                           |
| US03   | RF12                          | EP02            | Como administrador, quero fazer login seguro no sistema para acessar funcionalidades restritas.                                                        |
| US04   | RF16                          | EP02            | Como usuário autenticado, quero atualizar meus dados pessoais (exceto e-mail) para manter minhas informações atualizadas.                              |
| US05   | RF01                          | EP03            | Como administrador, quero adicionar itens ao cardápio com nome, descrição, preço (por tamanho), quantidade e imagem para manter o cardápio atualizado. |
| US06   | RF02                          | EP03            | Como administrador, quero remover itens do cardápio para retirar produtos indisponíveis ou descontinuados.                                             |
| US07   | RF03                          | EP03            | Como administrador, quero editar itens do cardápio para corrigir ou atualizar informações.                                                             |
| US08   | RF15                          | EP03            | Como cliente, quero visualizar todos os produtos do cardápio com nome, descrição, preços por tamanho e imagem em uma tela responsiva.                  |
| US09   | RF17, RF18                    | EP04            | Como cliente, quero adicionar e remover produtos na sacola de compras para montar meu pedido com controle de quantidade e preços.                      |
| US10   | RF19, RF20                    | EP04            | Como cliente, quero alterar a quantidade dos produtos na sacola de compras para ajustar meu pedido antes da finalização.                               |
| US11   | RF21                          | EP05            | Como cliente, quero concluir pedidos para finalizar a compra dos produtos selecionados.                                                                |
| US12   | RF22, RF23                    | EP05            | Como cliente, quero realizar encomendas e reservar produtos para garantir a disponibilidade futura.                                                    |
| US13   | RF04, RF05, RF06, RF07        | EP06            | Como administrador, quero gerenciar pedidos, alterar status, visualizar detalhes e receber notificações para organizar a produção e entrega.           |
| US14   | RF24, RF25                    | EP06            | Como cliente, quero acompanhar o status dos meus pedidos e visualizar histórico para controle pessoal.                                                 |
| US15   | RF08, RF09, RF10, RF11        | EP07            | Como administrador, quero receber notificações e confirmar recebimentos de pagamentos via PIX para controle financeiro da doceria.                     |
| US16   | RF29, RF30, RF31, RF32        | EP07            | Como cliente, quero gerar código PIX, visualizar QR Code, copiar chave e realizar o pagamento via Pix para concluir o meu pedido na doceria.           |
| US17   | RF33, RF34, RF35              | EP07            | Como cliente, quero confirmar pagamento, receber notificação e visualizar comprovante de pagamento para facilitar transações seguras.                  |

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

Requisitos **Could Have (C)** e **Won’t Have (W)** não farão parte do MVP, mas serão mantidos no backlog para iterações futuras.

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