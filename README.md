### Config do Banco de Dados:

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

### Para rodar o compose

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
