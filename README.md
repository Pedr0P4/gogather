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

Dessa modo, a aplicação subirá normalmente.