# Guia de Manutenção e Atualização (Helpdesk Mobile)

Olá! Como você é iniciante, aqui está o passo a passo de como proceder toda vez que você fizer uma alteração no código do seu aplicativo (no React) e quiser ver essa mudança no celular.

## Fluxo de Atualização Local

Sempre que você mudar algo em `src/`, siga estes 4 comandos no seu terminal:

### 1. Gerar o Site (Web Build)
Isso transforma seu código React em arquivos que o celular entende.
```bash
npm run build
```

### 2. Sincronizar com o Celular (Sync)
Isso copia os arquivos gerados no passo anterior para dentro das pastas `android/` e `ios/`.
```bash
npx cap sync
```

### 3. Gerar o APK (Android Build)
Este comando cria o arquivo instalável do Android usando as ferramentas que instalamos.
```bash
export JAVA_HOME=$HOME/java-sdk/latest-21
export PATH=$JAVA_HOME/bin:$PATH
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
cd android && ./gradlew assembleDebug
```

### 4. Mover para a pasta de download
Para você conseguir baixar no seu celular via navegador/servidor:
```bash
echo "84dy866n" | sudo -S cp app/build/outputs/apk/debug/app-debug.apk /backup/celular/
```

---

## Por que o Login pode estar falhando?

Mesmo com a URL correta, existem 3 motivos comuns para o erro "verifique suas credenciais" no celular:

1. **CORS no Servidor:** O servidor (Django) precisa autorizar o "celular" a falar com ele. O celular não envia um domínio como `localhost:3000`, ele envia `http://localhost` (Android) ou `capacitor://localhost` (iOS) como origem.
   - **Solução:** Adicionar essas origens no `CORS_ALLOWED_ORIGINS` do seu arquivo `settings.py` no Backend.

2. **Certificado SSL:** Se o seu servidor `helpdesk.tecnicolitoral.com` não tiver um certificado SSL válido (HTTPS), o Android pode bloquear a conexão por segurança.

3. **Verificação de CSRF:** O Django costuma exigir um token CSRF. No celular, como não usamos cookies da mesma forma que o navegador, o ideal é que o login use apenas o Token JWT.

### Como Debugar (Ver o erro real)
Como você está no Linux, você pode conectar seu celular no USB e ver o que está acontecendo "por dentro" do app:
1. Abra o Google Chrome no seu computador.
2. Digite `chrome://inspect/#devices`.
3. Se o app estiver aberto no celular (via USB), ele aparecerá ali. Clique em **inspect** para ver os erros vermelhos no Console, igual você faz no navegador.

---

## Configuração no Cloudflare Zero Trust

Se você estiver usando Cloudflare Access (Zero Trust) na frente do seu domínio, você **precisa** configurar o CORS e uma política de Bypass, senão o app será bloqueado:

1.  Vá em **Access** -> **Applications**.
2.  Edite a sua aplicação (`helpdesk.tecnicolitoral.com`).
3.  Na aba **Settings**, procure por **CORS**:
    *   **Allowed Origins**: Adicione `https://localhost` e `http://localhost`.
    *   **Allow Credentials**: ATIVAR.
    *   **Allowed Methods**: Selecione todos (GET, POST, etc).
    *   **Allowed Headers**: Adicione `Content-Type`, `Authorization`, `X-Requested-With`.
4.  Na aba **Policies**, crie uma regra de **Bypass**:
    *   **Path**: `/api*`
    *   **Include**: `Everyone` (ou similar).
