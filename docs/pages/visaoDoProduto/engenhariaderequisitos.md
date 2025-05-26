# Processo de ER

## Planejamento da Release

### Elicitação e Descoberta

- **Entrevistas**:  
  Realização de entrevistas estruturadas com os stakeholders da Bananoffee, com o objetivo de identificar, compreender e validar requisitos relevantes para o produto em desenvolvimento. Captação de expectativas, necessidades específicas e possíveis melhorias a partir da visão dos envolvidos no negócio.

- **Análise da Concorrência**:  
  Estudo das principais tendências de mercado e das funcionalidades oferecidas por plataformas similares à que será desenvolvida, bem como avaliação dos modelos de negócio adotados pelos concorrentes diretos do cliente. Essa análise tem como finalidade identificar boas práticas, oportunidades de diferenciação e alinhamento estratégico do produto.

### Análise e Consenso

- **MoSCoW**:  
  Utilização da técnica MoSCoW (Must have, Should have, Could have, Won't have) para classificar e priorizar os requisitos identificados. Essa abordagem permite uma organização clara das funcionalidades com base em sua criticidade e impacto no produto.

### Declaração

- **Temas, Épicos e US**:  
  Organização dos requisitos em três níveis hierárquicos — Temas, Épicos e User Stories — com o objetivo de estruturar e detalhar gradualmente as funcionalidades do sistema.

---

## Planejamento da Sprint

### Elicitação e Descoberta

- **Entrevistas**:  
  Realização de entrevistas estruturadas com os stakeholders da Bananoffee com o objetivo de refinar os requisitos previamente elicitados durante o planejamento da release, ajustando-os para que se adequem ao escopo e às prioridades da sprint atual.

### Análise e Consenso

- **Reuniões**:  
  Realização de reuniões com a equipe para analisar os requisitos levantados, promover melhorias e definir as tarefas que serão executadas ao longo da sprint. A distribuição das atividades entre os membros da equipe é feita com base na priorização estabelecida, utilizando-se um quadro Kanban no Trello para organizar e acompanhar o andamento das entregas.

### Verificação e Validação

- **Aplicação do DoR**:  
  Definição de critérios DoR (Definition of Ready) para avaliar se um requisito está pronto ou não para entrar para execução na Sprint.

### Organização e Atualização

- **Refinamento do Backlog**:  
  O backlog do produto é constantemente revisado e ajustado ao longo do desenvolvimento, acompanhando a evolução dos requisitos e das prioridades do projeto. Esse processo contínuo contribui para que os itens estejam sempre claros, atualizados e adequados ao contexto das próximas sprints.

---

## Execução

### Elicitação e Descoberta

- **Entrevista Aberta**:  
  A proximidade com os stakeholders permite a realização de entrevistas abertas e informais, conduzidas como conversas espontâneas. Essas entrevistas auxiliam indiretamente na verificação e validação de requisitos, ao confirmar entendimentos e alinhar expectativas de forma ágil e contínua.

### Representação

- **Prototipagem**:  
  Desenvolvimento de protótipos de alta fidelidade e mockups por meio da ferramenta Figma. Esses protótipos têm como objetivo validar as interfaces com os stakeholders antes do início do desenvolvimento, contribuindo para a identificação precoce de ajustes e a redução de retrabalho. Assim que um protótipo é validado, ele é considerado pronto para ser desenvolvido na sprint correspondente.

### Verificação e Validação

- **Prototipagem** _(repetição proposital para validação)_:  
  Reforço do processo de validação das interfaces com os stakeholders via protótipos de alta fidelidade no Figma.

### Organização e Atualização

- **Refinamento do Backlog**:  
  O backlog do produto é constantemente revisado e ajustado ao longo do desenvolvimento, garantindo que os itens estejam sempre claros, atualizados e adequados ao contexto das próximas sprints.

---

## Review

### Verificação e Validação

- **Reuniões**:  
  Realização de Sprint Review com os stakeholders. Nessa reunião é mostrado aos clientes o que foi desenvolvido ao longo da sprint para que eles possam testar e validar os resultados.

- **Critérios DoD**:  
  Definição e uso de critérios DoD (Definition of Done) para assegurar que uma tarefa ou funcionalidade atenda aos padrões de qualidade estabelecidos antes de ser considerada concluída. Esses critérios garantem a entrega de incrementos consistentes e prontos para uso ao final de cada sprint.

### Organização e Atualização

- **Refinamento do Backlog**:  
  Com base nos feedbacks obtidos durante a Sprint Review, são realizados ajustes na entrega concluída e no backlog do produto, sempre que pertinente. Esse processo garante a evolução contínua do produto alinhada às expectativas dos stakeholders.

---

## Quadro Resumo – Engenharia de Requisitos no Scrum

| Fases do Scrum               | Atividades da ER         | Prática                                      | Técnica                    | Resultado                                                                                   |
|------------------------------|--------------------------|-----------------------------------------------|----------------------------|---------------------------------------------------------------------------------------------|
| Planejamento da Release      | Elicitação e descoberta   | Levantamento de requisitos                    | Entrevista estruturada     | Identificação dos requisitos                                                                |
|                              | Elicitação e descoberta   | Levantamento de requisitos                    | Análise de concorrência    | Identificação de padrões de negócio                                                         |
|                              | Análise e consenso        | Priorização de requisitos                     | MoSCoW                     | Lista de requisitos classificada<br/>e priorizada                                           |
|                              | Declaração                | Registro de requisitos                        | Temas, épicos e US         | Funcionalidades do sistema estruturadas<br/>de maneira a organizar o desenvolvimento         |
| Planejamento da Sprint       | Elicitação e descoberta   | Levantamento e refinamento de requisitos      | Entrevista estruturada     | Refinamento dos requisitos já<br/>elicitados                                                |
|                              | Análise e consenso        | Refinamento de requisitos                     | Reunião com a equipe       | Refinamento dos requisitos da sprint                                                         |
|                              | Verificação e validação   | Definição de checklist                        | DoR                        | Lista de requisitos aptos a entrar para a sprint                                             |
|                              | Organização e atualização | Refinamento do Backlog                        | Grooming de Backlog        | Refinamento dos requisitos no backlog                                                        |
| Desenvolvimento da Sprint    | Elicitação e descoberta   | Refinamento de requisitos                     | Entrevista aberta          | Validações rápidas e pontuais sobre o produto com o cliente                                  |
|                              | Representação             | Visualização de interfaces                    | Prototipagem               | Protótipo de alta fidelidade                                                                 |
|                              | Verificação e validação   | Validação de interfaces                       | Prototipagem               | Validação do protótipo pelo cliente                                                          |
|                              | Organização e atualização | Refinamento do Backlog                        | Grooming de Backlog        | Refinamento dos requisitos no backlog                                                        |
| Review da Sprint             | Verificação e validação   | Refinamento dos requisitos                    | Reunião com os stakeholders| Validação do incremento da sprint                                                            |
|                              | Verificação e validação   | Definição de checklist                        | DoD                        | Validação do incremento da sprint                                                            |
|                              | Organização e atualização | Refinamento do Backlog                        | Grooming de Backlog        | Incorporação do feedback do cliente ao incremento                                            |


---

## Histórico de Versão

| Data      | Versão | Descrição             | Autor                |
|-----------|--------|------------------------|----------------------|
| 25/05/25  | 1.0    | Criação do Documento   | Fábio Santos Araújo |
| 25/05/25  | 1.1    | Documentação           | Marcos Bezerra      |
