# ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE 

## ESTRATÉGIA PRIORIZADA
- **Abordagem de Desenvolvimento de Software:** Ágil  
- **Ciclo de Vida:** Ágil  
- **Processo de Engenharia de Software:** Scrum / XP

## QUADRO COMPARATIVO

| Característica                      | SCRUM/XP                                                                                                                                                                                             | RAD                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Abordagem Geral** | Iterativo e incremental. Possui um foco maior na agilidade, com ênfase na colaboração e entregas funcionais, minimizando a documentação. | Iterativa e incremental, com foco em desenvolvimento rápido, prototipação contínua e entregas rápidas, com envolvimento constante do cliente.                                                                                                                                                                                                                                                       |
| **Foco em Arquitetura** | A arquitetura é desenvolvida de forma incremental e evolutiva, com o foco em atender às necessidades imediatas do produto. Não há um design extenso ou detalhado no início do projeto. | A arquitetura evolui com base em protótipos e interação com o cliente.                                                                                                                                                                                                                                                                               |
| **Estrutura de Processos** | Ciclos curtos (Sprints) de desenvolvimento. Processo ágil e flexível, com entregas incrementais e feedback contínuo. Sprints podem durar 2-4 semanas. | Baseado em fases como planejamento de requisitos, prototipagem, testes e implementação. Foco em prototipação rápida, iteração com o cliente e entregas rápidas. Ciclos rápidos com entregas parciais e prazos rígidos.                                                                                                                                                               |
| **Flexibilidade de Requisitos** | Alta flexibilidade movida por feedback do cliente a cada Sprint. Mudanças de requisitos são bem-vindas a cada iteração. | Alta flexibilidade, com mudanças frequentes durante a prototipação. Os requisitos evoluem com o tempo conforme a interação com o cliente.                                                                                                                                                                                                                                                        |
| **Colaboração com o Cliente** | Alto envolvimento do cliente. Durante as Sprints, o cliente revisa os incrementos ou fornece feedback contínuo. | Envolvimento contínuo e intenso do cliente durante todo o processo, especialmente nas fases de prototipação e feedback.                                                                                                                                                                                                                                     |
| **Complexidade do Processo** | Processo simplificado, com maior foco em entregas contínuas e autonomia da equipe. Menor ênfase em documentação. | Processo leve e adaptável, com foco em protótipos e código funcional, mas pode se tornar complexo se não houver controle adequado sobre mudanças rápidas.                                                                                                                                                                                                                                                                      |
| **Práticas de Desenvolvimento** | Programação em par, integração contínua, testes automatizados, refatoração, design simples, e foco em qualidade contínua durante o desenvolvimento. | Prototipação rápida, refinamento frequente, desenvolvimento paralelo com feedback constante do cliente.                                                                                                                                                                                                                                                                                         |
| **Controle de Qualidade** | Testes automatizados, TDD (Test-Driven Development), integração contínua, garantindo qualidade durante o desenvolvimento. | Riscos reduzidos com testes frequentes, validação rápida dos protótipos e ajustes com base no feedback do cliente.                                                                                                                                                                                                                                                                                         |
| **Suporte às Equipes de Desenvolvimento** | Equipes mais autônomas e colaborativas, com foco em comunicação direta para resolver problemas rapidamente. | Suporta equipes pequenas com alta colaboração e rapidez, com menos definição de papéis formais.                                                                                                                                                                                                                                                           |

## JUSTIFICATIVA
### Justificativa para Adoção do Scrum/XP

Com base na análise comparativa entre os modelos **RAD** e **Scrum/XP**, escolhemos o **Scrum/XP** para conduzir o projeto *Bananoffee* pelos seguintes motivos:

1. **Adaptação contínua e entregas incrementais**  
   - O Scrum/XP estrutura-se em sprints curtos (2–4 semanas), permitindo ciclos constantes de planejamento, desenvolvimento e revisão.  
   - Ao final de cada sprint, validamos funcionalidades diretamente com o cliente, identificamos ajustes e priorizamos melhorias.  

2. **Qualidade técnica integrada**  
   - Ao contrário do RAD, que privilegia protótipos rápidos mas dá menos ênfase a processos formais, o Scrum/XP incorpora práticas como **TDD** (Test‑Driven Development), integração contínua, refatoração e pair programming.  
   - Essas práticas asseguram um código mais limpo, reduzem defeitos e facilitam a manutenção ao longo do tempo.  
   - Mesmo focando na entrega de um MVP funcional, mantemos um padrão de qualidade que evita retrabalho e acelera a evolução do produto.

3. **Leveza e escalabilidade do processo**  
   - O Scrum/XP oferece uma estrutura enxuta — com papéis bem definidos (*Product Owner*, *Scrum Master*, time de desenvolvimento) e cerimônias objetivas — ao mesmo tempo em que permanece flexível para mudanças de prioridade.  
   - À medida que o projeto evoluir, é possível escalar o framework (por exemplo, por meio de práticas como Scrum of Scrums) mantendo a agilidade e a transparência dos fluxos.

Além disso, o Scrum/XP permite lidar com os desafios específicos do projeto Bananoffee, como:

- Integração com o WhatsApp Business para continuidade dos pedidos.
- Implementação do gerador de QR Code para pagamento via Pix.
- Transição suave do processo manual atual para uma plataforma digital.
- Treinamento rápido da equipe dos sócios, com mínima curva de aprendizado.

Em resumo, o **Scrum/XP** combina rapidez de entrega, qualidade técnica e adaptabilidade — características essenciais para responder às demandas dinâmicas do *Bananoffee* e garantir um produto robusto e alinhado às necessidades dos usuários.

---

## Histórico de Versão
| Data     | Versão | Descrição                            | Autor         |
|----------|--------|----------------------------------------|---------------|
| 19/04/25 | 1.0    | Criação do Documento                   | Bruno Garcia  |
| 20/04/25 | 1.1    | Estratégias de Engenharia de Software  | Fábio Araújo  |
