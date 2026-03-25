## Config do Banco de Dados:

1. Navegue até o diretório de recursos do projeto Spring:
   ```bash
   src/main/resources/
   ```
2. Crie um novo arquivo chamado **`secret.yaml`**.
3. Adicione as variáveis `db.username` e `db.password` dentro do arquivo, seguindo a estrutura abaixo e substituindo com as suas credenciais locais do PostgreSQL:

```yaml
db:
  username: seu_usuario_postgres
  password: sua_senha_postgres
```

Desse modo, a aplicação subirá normalmente.

## Para Subir Container do BD no Docker

1. Vá até o diretório principal do projeto (o mesmo do pom.xml e compose.yaml)
2. Crie um novo arquivo chamado **`.env`**.
3. Adicione as variáveis `DB_USER` e `DB_PASS` dentro do arquivo, seguindo a estrutura abaixo e substituindo com as suas credenciais locais do PostgreSQL:

```env
DB_USER=seu_usuario
DB_PASS=sua_senha
```

Após isso, só rodar 
```bash
docker compose up -d
``` 
E o banco de dados irá subir.

## Configuração do Mapa (Mapbox)

Este projeto utiliza o **Mapbox GL JS** para renderizar os mapas interativos e customizados. Para que o mapa seja exibido corretamente no seu ambiente local, é necessário gerar um Token de Acesso Público e configurá-lo nas variáveis de ambiente.

### Passo a Passo para gerar o Token:

1. **Crie uma conta:** Acesse o site oficial do Mapbox em [Mapbox GL JS](https://www.mapbox.com/) e clique em "Sign Up" (a conta gratuita é suficiente).
2. **Acesse a aba Tokens:** Após o login, vá para a sua página de conta (Account Dashboard). No menu lateral clique em "Tokens".
4. **Copie o Token:** Na parte inferior da tela, você verá uma seção chamada **Access Tokens**. Copie o token padrão (Default public token). Ele sempre começa com as letras `pk.`.

### Configurando no Projeto (Frontend)

Na raiz da pasta frontend, crie um arquivo chamado `.env.local` (caso ele ainda não exista). **Atenção:** Este arquivo não será commitado ao Github pois já está no gitignore.

Adicione a seguinte linha ao arquivo, colando o token que você copiou:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=seu_token_gigante_aqui
