# ai-buddy

AI Buddy 閺勵垯绔存稉顏勭唨娴?Vue 3 閻ㄥ嫮些閸斻劎顏崜宥囶伂閸樼喎鐎风€圭偟骞囨い鍦窗閿涘本娼靛┃鎰艾瑜版挸澧犲銉ょ稊閸栬桨鑵戦惃?UI 閸樼喎鐎风€电厧鍤粙瑁も偓?
## V1 閼煎啫娲?
- Welcome 濞嗐垼绻嬫い?- 3 濮?Onboarding 瀵洖顕?- 閻ц缍?/ 濞夈劌鍞芥稉鈧担鎾冲闁村瓨娼堟い?- Home 妫ｆ牠銆?- 閺堫剙婀?mock 娴兼俺鐦芥稉?localStorage 閹镐椒绠欓崠?- 鐠侯垳鏁辩€瑰牆宕兼稉搴＄唨绾偓鐞涖劌宕熼弽锟犵崣

## 閹垛偓閺堫垱鐖?
- Vue 3
- Vite
- Vue Router
- Vitest
- Vue Test Utils
- Docker
- Nginx

## 閺堫剙婀撮崥顖氬З

```bash
npm install
npm run dev
```

## 濞村鐦稉搴㈢€?
```bash
npm test -- --run
npm run build
```

## Docker 闁劎璁?
妞ゅ湱娲板鍙夊絹娓氭盯娼伴崥鎴濆礋閸?VPS 閻?Docker Compose 闁劎璁查弬鐟扮础閿涘矂鈧倸鎮庨崗鍫㈡纯閹恒儱顕径鏍ㄦ瘹闂?`80` 缁旑垰褰涢妴?
### 闁劎璁查弬鍥︽

- `Dockerfile`閿涙艾顦块梼鑸殿唽閺嬪嫬缂?Vue 娴溠呭⒖楠炴湹姘︾紒?Nginx 閹绘劒绶甸張宥呭
- `docker-compose.yml`閿涙艾鐣炬稊?`ai-buddy` 閺堝秴濮熼獮鑸垫Ё鐏?`80:80`
- `deploy/nginx.conf`閿涙艾顦╅悶鍡涙饯閹浇绁┃鎰嫲 Vue Router history 閸ョ偤鈧偓
- `scripts/start.sh`閿涙碍鐎鍝勮嫙閸氬骸褰撮崥顖氬З閺堝秴濮?- `scripts/stop.sh`閿涙艾浠犲銏犺嫙缁夊娅庨張宥呭
- `scripts/logs.sh`閿涙碍鐓￠惇瀣）韫囨绱濇妯款吇閹镐胶鐢荤捄鐔兼
- `scripts/status.sh`閿涙碍鐓￠惇瀣秼閸撳秵婀囬崝锛勫Ц閹?
### CentOS / GCP VPS 娴ｈ法鏁ゅ銉╊€?
1. 鐎瑰顥?Docker Engine 閸?Docker Compose 閹绘帊娆?2. 閹峰褰囨禒鎾崇氨娴狅絿鐖?3. 鏉╂稑鍙嗘い鍦窗閻╊喖缍?4. 閹笛嗩攽 `chmod +x scripts/*.sh`
5. 閹笛嗩攽 `./scripts/start.sh`
6. 閹笛嗩攽 `./scripts/status.sh` 绾喛顓荤€圭懓娅掗悩鑸碘偓?7. 閹笛嗩攽 `./scripts/logs.sh` 閺屻儳婀呯€圭偞妞傞弮銉ョ箶

### 鐢摜鏁ら崨鎴掓姢

```bash
./scripts/start.sh
./scripts/status.sh
./scripts/logs.sh
./scripts/stop.sh
```

婵″倹鐏夐崣顏呮Ц閹磭婀呮稉鈧▎鈩冩）韫囨绱濇稉宥嗗瘮缂侇叀绐￠梾蹇ョ礉閸欘垯浜掗惄瀛樺复娴ｈ法鏁ら敍?
```bash
docker compose -f docker-compose.yml logs --tail=200
```

## 閻╊喖缍嶇拠瀛樻

- `src/`閿涙瓘ue 3 閸撳秶顏禒锝囩垳
- `tests/`閿涙俺顢戞稉鐑樼ゴ鐠?- `docs/superpowers/`閿涙碍婀板▎鈥崇杽閻滄壆娈戠拋鎹愵吀閺傚洦銆傞崪宀冾吀閸?- `deploy/`閿涙瓊ginx 闁板秶鐤?- `scripts/`閿涙瓘PS 鏉╂劗娣懘姘拱
- `welcome/`閵嗕梗onboarding_*`閵嗕梗auth_qq/`閵嗕梗register_form/`閵嗕梗home/` 缁涘绱伴崢鐔奉潗閸樼喎鐎风€电厧鍤弬鍥︽
