## Startup Engineering - Trello Copy
### Student: Anghel Andrei

Aplicatia deployata poata fi regasita la urmatorul [link](https://trello-copy-theta.vercel.app/).
Also, recomand sa cititi Readme-ul prin intermediul [Github](https://github.com/AnghelAndrei28/TrelloCopy) pentru o experienta full

Timp de lucru: 24 ore
Mod de lucru:
- Am inceput prin creerea unei aplicatii next.js si MongoDB, folosind [template-ul oficial](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/) si configurarea acestui proiect.
- Am inceput definirea modelelor in ordinea in care acestea sunt folosite in cadrul proiectului: board -> boardQueue -> card
- Pentru fiecare etapa din proiect, am inceput prin creerea modelului, creerea paginii/componentei si testarea cu dummy data. Dupa aceea, am realizat endpoint-urile (in folderul pages/api) si am definit actiunile asupra bazei date (in app/actions.ts)
- Pentru obtinerea de date, am considerat ca este mai util sa tin 3 colectii, cate una pentru fiecare model al aplicatiei, in care retin doar id-ul parintelui, iar partea de fetch de date, de exemplu pentru card-urile unei lista, sa se realizeze un request separat care sa returneze doar card-urile specifice listei.
- Am realizat partea de deployment, folosind Vercel, acest lucru realizandu-se extrem de usor prin intermediul repository-ului de Github (a se nota ca am petrecut extrem de mult timp pentru a ma prinde ca trebuie configurat cluster-ul de Mongo sa accepte orice IP)
- La final, am adaugat si partea de Posthog, precum a fost prezentat in laborator. Am decis sa urmaresc flow-ul pe care utilizatorii il urmeaza, astfel ca am urmarit principalele componente ale proiectului:
LandingPage, BoardPage, CreateBoardModal, CreateCardModal si CardDetails. Initial am avut un singur funnel, care ar fi trebuit sa obtina traficul, intr-un mod obisnuit de utilizare si l-am trimis unor grupuri de persoane, mentionand ca este o copie de Trello si sa isi faca de cap. Rezultate au aratat contrariul, si anume ca un singur utilizator a avut acelasi flow, pe care il gandisem.
![image](https://github.com/user-attachments/assets/ca443548-d949-4de2-95a2-bd02c7292c66)
- Acest lucru m-a facut sa ma intreb daca sunt probleme in modul de implementare sau daca este un alt flow de fapt. Am creat un al doilea funnel, care mi-a demonstrat ca majoritatea utilizatorilor au preferat sa foloseasca board-urile deja existente, in cadrul carora sa testeze functionalitatile
![image](https://github.com/user-attachments/assets/4b228b4a-a91a-4fec-814d-71f162637f38)
- In afara faptului ca mi s-a atras atentia faptului ca proiectul avea probleme, cand functiona pe browsere ce avea dark mode-ul activat, lucru ce a fost realizat ulterior, nu consider ca au existat probleme de implementare. Am urmart de asemenea log-urile din cadrul tab-ului Activity din Posthog pentru a ma asigura ca toate functionalitatile au fost testate. De asemenea, datorita faptului ca Posthog-ul inregistreaza orice actiune, nu consider ca a fost nevoie sa creez evenimente separate pentru fiecare actiune.

### Thoughts
A fost destul de fun tema si mi se pare ca demonstreaza mai bine decat lab-urile utilitatea Next.js-ului. I'm just amazed by this framework, insa nu il simt atat de stabil, precum consider un framework dedicat de backend precum SpringBoot, dar pentru proiecte super rapide, pare a fi ce trebuie.
