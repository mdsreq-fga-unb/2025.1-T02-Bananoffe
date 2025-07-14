# Diagrama de casos de uso - ConnectCare

![Foto do diagrama de casos de uso do connect care](UC.png)

## Diagrama de casos de uso - Miro
Segue o mesmo diagrama UML, mas na plataforma Miro, para melhor visualização:

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVIhhQSTE=/?embedMode=view_only_without_ui&moveToViewport=-8963,-946,3383,3383&embedId=747747756137" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Atores
- Pacientes
- Administradores do Sistema
- Profissionais da Saúde
  - Médicos
  - Enfermeiros
  - Agentes comunitários
- Organizações parceiras
  - ONGs
  - Hospitais
  - Instituições Governamentais

## Casos de uso identificados
Segue os casos de uso identificados para cada ator do sistema:

### Casos de uso - Pacientes
- Criar perfil de paciente
- Realizar Login
- Localizar posto
- Agendar consultas
- Fornecer feedback
- Se inscrever em campanhas de saúde

### Casos de uso - Administradores do Sistema 
- Monitorar indicadores de desempenho
- Gerenciar informações de parceiros
- Responder a dúvidas e reclamações dos usuários

### Casos de uso - Organizações parceiras
- Registrar campanhas de saúde

### Casos de uso - Profissionais da saúde
- Criar perfil de profissional
- Realizar Login
- Gerenciar atendimentos
- Visualizar agenda de consultas
- Organizar fluxo de trabalho
- Visualizar histórico do paciente
- Gerenciar prontuário do paciente

### Casos de uso - Agentes comunitários
- Gerenciar visitas domiciliares
- Criar relatórios sobre as condições de saúde

---

# Caso de Uso: Responder Dúvidas e Reclamações

## 1. Breve Descrição
Este caso de uso descreve como o Administrador do Sistema pode gerenciar dúvidas e reclamações enviadas por usuários externos (Pacientes, Profissionais de Saúde e Agentes Comunitários) na plataforma ConnectCare. As ações possíveis incluem visualizar solicitações, responder, encaminhar para outro setor ou marcar como resolvidas.

## 2. Atores
- Usuário Externo (Paciente, Profissional de Saúde ou Agente Comunitário)
- Administrador do Sistema

## 3. Condições Prévias
- O usuário externo deve estar autenticado no sistema.
- O sistema deve estar ativo e apto a receber novas solicitações.

## 4. Fluxo Básico (FB)
1. O caso de uso inicia quando um usuário externo registra uma dúvida ou reclamação.
2. O usuário acessa a plataforma e envia a solicitação. [FE01][RN02]
3. O sistema armazena a solicitação e a disponibiliza ao Administrador.
4. O Administrador acessa a área administrativa e visualiza as solicitações pendentes. [FE03][RN03]
5. O Administrador escolhe uma das ações:
   - Responder à solicitação [FA01];
   - Encaminhar para outro setor [FA02];
   - Marcar como resolvida [FA03].
6. O sistema registra a ação realizada e notifica o usuário externo.
7. O caso de uso é encerrado.

## 5. Fluxos Alternativos (FA)

### FA01 – Responder à Solicitação
1. O Administrador seleciona uma solicitação.
2. O sistema exibe seus detalhes (tipo, data, usuário e descrição).
3. O Administrador insere e confirma a resposta. [FE01][FE02][RN02]
4. O sistema salva a resposta e envia notificação ao usuário.

### FA02 – Encaminhar para Outro Setor
1. O Administrador opta por encaminhar a solicitação.
2. O sistema apresenta a lista de setores disponíveis.
3. O Administrador escolhe o setor e, se desejar, insere um comentário.
4. Ao confirmar, o sistema redireciona a solicitação e notifica o setor responsável. [FE03][RN03]

### FA03 – Marcar como Resolvida
1. O Administrador escolhe marcar a solicitação como resolvida.
2. O sistema apresenta a lista de solicitações pendentes.
3. O Administrador revisa o histórico e, opcionalmente, insere uma justificativa.
4. O sistema registra a ação e notifica o usuário externo.

## 6. Fluxos de Exceção (FE)

### FE01 – Resposta Inválida
Se a resposta estiver vazia ou contiver caracteres inválidos, o sistema bloqueia o envio e exibe mensagem de erro.

### FE02 – Falha no Envio da Resposta
Em caso de erro no banco de dados ou na conexão, o sistema informa a falha ao usuário.

### FE03 – Falha no Encaminhamento
Se o setor estiver indisponível, o sistema exibe uma mensagem de erro e retorna à etapa anterior.

## 7. Regras de Negócio (RN)

- **RN01 – Tempo Máximo de Resposta**  
  Dúvidas devem ser respondidas em até 48h. Reclamações críticas, em até 24h.

- **RN02 – Validação da Resposta**  
  A resposta deve ser válida, sem campos vazios ou caracteres inválidos. [FE01]

- **RN03 – Registro de Histórico**  
  Todas as interações devem ser salvas para fins de auditoria e consulta futura.

- **RN04 – Acessibilidade**  
  O sistema deve ser compatível com VLibras e leitores de tela.

## 8. Pós-Condições
O usuário externo tem sua solicitação respondida, encaminhada ou marcada como resolvida, com devida notificação.

## 9. Ponto de Extensão
Não se aplica.

---

# Caso de Uso: Registrar Campanhas de Saúde

## 1. Breve Descrição
Este caso de uso permite que o Administrador do Sistema registre campanhas de saúde na plataforma ConnectCare. A funcionalidade inclui o cadastro de informações como título, descrição, público-alvo, datas e local de realização. O objetivo é divulgar e organizar ações de promoção à saúde para a população atendida.

## 2. Atores
- Administrador do Sistema

## 3. Condições Prévias
- O Administrador deve estar autenticado no sistema.
- O sistema deve estar funcionando corretamente e com acesso ao módulo de campanhas.

## 4. Fluxo Básico (FB)
1. O Administrador acessa o módulo de campanhas de saúde.
2. O sistema exibe a opção para criar nova campanha.
3. O Administrador preenche os dados da campanha:
   - Título
   - Descrição
   - Público-alvo
   - Data de início e fim
   - Local da campanha
4. O Administrador confirma o cadastro.
5. O sistema valida os dados inseridos. [FE01][RN02]
6. Em caso de sucesso, a campanha é registrada e fica disponível para visualização.
7. O caso de uso é encerrado.

## 5. Fluxos Alternativos (FA)

### FA01 – Editar Campanha Existente
1. O Administrador seleciona uma campanha cadastrada.
2. O sistema exibe os dados atuais.
3. O Administrador edita os campos desejados e confirma.
4. O sistema valida e salva as alterações. [FE01][RN02]

### FA02 – Excluir Campanha
1. O Administrador acessa a lista de campanhas.
2. Seleciona uma campanha para exclusão.
3. O sistema solicita confirmação.
4. Após confirmação, a campanha é removida do sistema.
5. O sistema registra a ação para fins de histórico. [RN03]

## 6. Fluxos de Exceção (FE)

### FE01 – Dados Inválidos
Se algum campo obrigatório estiver em branco ou com dados inválidos, o sistema exibe uma mensagem de erro e impede o prosseguimento.

### FE02 – Falha no Cadastro
Se ocorrer falha na conexão ou no banco de dados, o sistema exibe uma mensagem de erro e solicita nova tentativa.

## 7. Regras de Negócio (RN)

- **RN01 – Datas Válidas**  
  A data de término da campanha não pode ser anterior à data de início.

- **RN02 – Campos Obrigatórios**  
  Título, público-alvo, datas e local são campos obrigatórios. [FE01]

- **RN03 – Registro de Histórico**  
  Toda campanha criada, editada ou excluída deve ser registrada para fins de auditoria.

- **RN04 – Acessibilidade**  
  O sistema deve ser acessível, compatível com leitores de tela e ferramentas como VLibras.

## 8. Pós-Condições
A campanha de saúde é registrada, editada ou excluída, com os dados corretamente armazenados no sistema.

## 9. Ponto de Extensão
Não se aplica.

---

# Caso de Uso: Visualizar Histórico do Paciente

## 1. Breve Descrição
Este caso de uso permite que um paciente visualize seu histórico médico por meio da plataforma ConnectCare. O histórico inclui consultas, exames, tratamentos e demais informações relevantes. O objetivo é oferecer ao paciente acesso rápido, seguro e centralizado aos seus registros de saúde.

## 2. Atores
- Paciente
- Profissional de Saúde (apenas com autorização expressa do paciente)

## 3. Condições Prévias
- O paciente deve estar autenticado na plataforma.
- O histórico médico deve estar cadastrado no sistema.
- Profissionais de saúde só poderão acessar o histórico mediante autorização do paciente.

## 4. Fluxo Básico (FB)
1. O paciente acessa o menu principal e seleciona a opção "Histórico Médico".
2. O sistema verifica se o paciente está autenticado. [FE01]
   - Se não estiver, redireciona para a tela de login.
3. O sistema solicita os critérios de busca (ex: período, tipo de registro).
4. O paciente preenche os critérios. [FE03]
   - Caso contrário, o sistema exibe mensagem de erro e solicita preenchimento.
5. O sistema valida os critérios e aplica as regras de acesso. [RN01]
6. O sistema exibe a lista de registros que correspondem à busca.
   - Se nenhum registro for encontrado, segue para o fluxo alternativo [FA01].
7. O paciente seleciona um registro para ver detalhes.
8. O sistema apresenta as informações completas (data, diagnóstico, prescrições, anotações). [RN02]
9. O paciente pode optar por baixar ou imprimir o registro. [RN03]
10. O caso de uso é encerrado.

## 5. Fluxos Alternativos (FA)

### FA01 – Sem Registros Encontrados
Se não houver registros com os critérios informados, o sistema exibe mensagem e permite que novos critérios sejam inseridos.

### FA02 – Acesso Negado ao Profissional de Saúde
Se um profissional tentar acessar o histórico sem autorização, o sistema bloqueia o acesso, exibe uma mensagem de erro e retorna ao menu.

## 6. Fluxos de Exceção (FE)

### FE01 – Falha na Autenticação
Se o paciente ou profissional não estiver autenticado, será redirecionado para a tela de login.  
**Regra relacionada:** RN01

### FE02 – Erro no Carregamento dos Registros
Em caso de falha na consulta ao banco de dados ou sistema, uma mensagem de erro será exibida, e o usuário poderá tentar novamente.  
**Regra relacionada:** RN03

### FE03 – Informações Obrigatórias Não Preenchidas
Se os critérios de busca não forem preenchidos, o sistema impedirá o avanço até que os dados sejam inseridos.  
**Regra relacionada:** RN01

### FE04 – Violação de Segurança ou Acesso Não Autorizado
Se um usuário tentar acessar dados sem permissão, o sistema bloqueará a ação e informará sobre a violação.  
**Regra relacionada:** RN02

## 7. Regras de Negócio (RN)

- **RN01 – Controle de Acesso**  
  Apenas pacientes autenticados podem acessar seu histórico.  
  Profissionais de saúde só podem visualizar com autorização do paciente.

- **RN02 – Segurança e Privacidade**  
  Todos os dados devem ser protegidos conforme a LGPD, garantindo acesso apenas a usuários autorizados.

- **RN03 – Disponibilidade dos Registros**  
  Os registros devem estar acessíveis e armazenados de forma segura e confiável.

## 8. Pós-Condições
- O paciente consegue visualizar seu histórico médico.
- Profissionais de saúde acessam os dados apenas mediante autorização do paciente.

## 9. Ponto de Extensão
- **Local:** Durante a visualização do histórico médico.
- **Descrição:** O caso de uso "Visualizar Histórico do Paciente" pode ser estendido por "Realizar Atendimento Médico", permitindo que o profissional utilize os dados para basear a consulta e registrar novas informações no prontuário do paciente.

---

| Data     | Versão | Descrição              | Autor                                   |
| -------- | ------ | ---------------------- | ------------------------------------- |
| 02/07/25 | 1.0    | Criação do Documento   | Bruno Garcia, Guilherme Zanella e Marcos Bezerra |
| 13/07/25 | 1.1    | Colocando em UML       | Marcos Bezerra                        |
| 14/07/25 | 1.2    | Adicionando os Casos de Uso | Fábio Araújo                          |
