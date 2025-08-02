/* ==========================================================================
   TEST DE MADUREZ DIGITAL  –  Paso 3 (completo)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Banco de preguntas con pesos y opciones */
  const questions = [
    {
      text:'¿Su empresa tiene un plan de transformación digital documentado y alineado con la estrategia de negocio?',
      weight:0.15,
      options:[
        {v:1,t:'No tenemos plan digital formal'},
        {v:2,t:'Iniciativas digitales dispersas'},
        {v:3,t:'Plan digital en desarrollo'},
        {v:4,t:'Plan completo en ejecución'},
        {v:5,t:'Transformación digital integrada'}
      ]
    },
    {
      text:'¿Cómo calificaría el estado actual de su infraestructura tecnológica (servidores, red, equipos)?',
      weight:0.15,
      options:[
        {v:1,t:'Equipos obsoletos, problemas frecuentes'},
        {v:2,t:'Funcional pero requiere actualizaciones'},
        {v:3,t:'Moderna con mantenimiento programado'},
        {v:4,t:'Tecnología avanzada, alta disponibilidad'},
        {v:5,t:'Infraestructura cutting‑edge, escalable'}
      ]
    },
    {
      text:'¿Qué medidas de ciberseguridad y protección perimetral tiene implementadas?',
      weight:0.12,
      options:[
        {v:1,t:'Solo antivirus básico'},
        {v:2,t:'Antivirus + firewall básico'},
        {v:3,t:'Firewall + backups automatizados'},
        {v:4,t:'Seguridad multicapa + MFA'},
        {v:5,t:'Estrategia completa con SOC 24/7'}
      ]
    },
    {
      text:'¿Su empresa utiliza análisis de datos para la toma de decisiones empresariales?',
      weight:0.12,
      options:[
        {v:1,t:'No utilizamos datos para decisiones'},
        {v:2,t:'Reportes básicos ocasionales'},
        {v:3,t:'Dashboards regulares con KPIs'},
        {v:4,t:'Analytics avanzado guía decisiones'},
        {v:5,t:'Inteligencia predictiva & ML'}
      ]
    },
    {
      text:'¿Cómo evaluaría las competencias digitales de su equipo de trabajo?',
      weight:0.10,
      options:[
        {v:1,t:'Competencias muy limitadas'},
        {v:2,t:'Conocimientos básicos, requiere training'},
        {v:3,t:'Intermedio y dispuesto a aprender'},
        {v:4,t:'Buen nivel con líderes tecnológicos'},
        {v:5,t:'Equipo altamente innovador'}
      ]
    },
    {
      text:'¿Qué porcentaje de sus procesos empresariales están automatizados?',
      weight:0.10,
      options:[
        {v:1,t:'0‑20 % manuales'},
        {v:2,t:'21‑40 % automatización básica'},
        {v:3,t:'41‑60 % automatización significativa'},
        {v:4,t:'61‑80 % alta automatización'},
        {v:5,t:'81‑100 % automatización inteligente'}
      ]
    },
    {
      text:'¿Sus sistemas y herramientas digitales están integrados entre sí?',
      weight:0.08,
      options:[
        {v:1,t:'Sistemas totalmente aislados'},
        {v:2,t:'Integraciones manuales esporádicas'},
        {v:3,t:'Algunas integraciones automatizadas'},
        {v:4,t:'Ecosistema integrado con APIs'},
        {v:5,t:'Arquitectura completamente unificada'}
      ]
    },
    {
      text:'¿Su empresa destina presupuesto específico para proyectos de transformación digital?',
      weight:0.08,
      options:[
        {v:1,t:'Sin presupuesto para digital'},
        {v:2,t:'Presupuesto mínimo reactivo'},
        {v:3,t:'Partida anual para mejoras'},
        {v:4,t:'Inversión significativa con ROI medible'},
        {v:5,t:'Digital es inversión prioritaria'}
      ]
    },
    {
      text:'¿Tienen políticas establecidas para el gobierno y protección de datos empresariales?',
      weight:0.05,
      options:[
        {v:1,t:'Sin políticas formales'},
        {v:2,t:'Políticas básicas de respaldo'},
        {v:3,t:'Privacidad y cumplimiento legal'},
        {v:4,t:'Gobierno de datos con roles definidos'},
        {v:5,t:'Estrategia integral de data management'}
      ]
    },
    {
      text:'¿Cómo es la actitud de su equipo hacia la adopción de nuevas tecnologías?',
      weight:0.05,
      options:[
        {v:1,t:'Resistencia activa al cambio'},
        {v:2,t:'Aceptación pasiva sin entusiasmo'},
        {v:3,t:'Apertura con apoyo'},
        {v:4,t:'Entusiasmo proactivo'},
        {v:5,t:'Cultura de innovación'}
      ]
    }
  ];

  /* 2. Refs DOM */
  const qContainer = document.querySelector('.question-container');
  const progress   = document.querySelector('.progress-fill');
  const btnPrev    = document.getElementById('btnPrev');
  const btnNext    = document.getElementById('btnNext');
  const resultBox  = document.querySelector('.results-container');
  const resLevel   = document.getElementById('resultLevel');
  const resDesc    = document.getElementById('resultDesc');
  const resRecs    = document.getElementById('resultRecs');

  let current = 0;
  const responses = Array(questions.length).fill(null);

  /* 3. Render question */
  function renderQuestion(i){
    const q = questions[i];
    qContainer.innerHTML = `
      <div class="question-card">
        <h3>${i+1}/10 · ${q.text}</h3>
        <div class="answers">
          ${q.options.map(o=>`
            <label>
              <input type="radio" name="q${i}" value="${o.v}" ${responses[i]==o.v?'checked':''}>
              <span>${o.t}</span>
            </label>`).join('')}
        </div>
      </div>`;
    /* listeners */
    qContainer.querySelectorAll('input[type=radio]').forEach(r=>{
      r.addEventListener('change',e=>{
        responses[i]=Number(e.target.value);
        btnNext.disabled=false;
      });
    });
    /* UI state */
    progress.style.width = `${i/questions.length*100}%`;
    btnPrev.disabled = i===0;
    btnNext.textContent = i===questions.length-1 ? 'Finalizar' : 'Siguiente →';
    btnNext.disabled = responses[i]==null;
  }

  /* 4. Calcular resultado */
  function calcResult(){
    let weighted=0;
    questions.forEach((q,idx)=>{
      weighted += (responses[idx]||0)*q.weight;
    });
    const percent = Math.round(weighted*20);      // 0‑100
    let level=1;
    if(percent>=81) level=5;
    else if(percent>=66) level=4;
    else if(percent>=51) level=3;
    else if(percent>=36) level=2;

    const messages=[
      {lvl:1, msg:'Nivel 1 de 5 · Básico', desc:'Infraestructura mínima y procesos manuales.', recs:[
        'Diseñar un plan digital básico',
        'Renovar equipos obsoletos',
        'Implementar antivirus corporativo'
      ]},
      {lvl:2, msg:'Nivel 2 de 5 · Funcional', desc:'Red operativa pero sin protección perimetral ni integración.', recs:[
        'Incorporar firewall empresarial',
        'Definir presupuesto de transformación',
        'Capacitar equipo en ciberseguridad'
      ]},
      {lvl:3, msg:'Nivel 3 de 5 · Desarrollado', desc:'Sistemas integrados y procesos digitalizados.', recs:[
        'Potenciar analítica de datos',
        'Automatizar procesos repetitivos',
        'Fortalecer competencias digitales'
      ]},
      {lvl:4, msg:'Nivel 4 de 5 · Avanzado', desc:'Plataformas robustas y cultura tecnológica sólida.', recs:[
        'Implementar IA predictiva',
        'Optimizar automatización end‑to‑end',
        'Medir ROI de iniciativas digitales'
      ]},
      {lvl:5, msg:'Nivel 5 de 5 · Líder Digital', desc:'Innovación continua con IA integrada.', recs:[
        'Explorar tecnologías emergentes',
        'Escalar modelos de IA',
        'Compartir mejores prácticas en la industria'
      ]}
    ];

    const m = messages.find(m=>m.lvl===level);
    resLevel.textContent = `${m.msg} (${percent} %)`;
    resDesc.textContent  = m.desc;
    resRecs.innerHTML = m.recs.map(r=>`<li>${r}</li>`).join('');

    /* Mostrar resultado y ocultar test */
    document.querySelector('.digital-maturity-widget').classList.add('done');
    resultBox.classList.remove('hidden');
    progress.style.width='100%';

    /* simple analytics */
    console.log('maturity_complete',{percent,level});
  }

  /* 5. Navegación */
  btnPrev.addEventListener('click',()=>{
    if(current>0){current--;renderQuestion(current);}
  });
  btnNext.addEventListener('click',()=>{
    if(current<questions.length-1){
      current++;renderQuestion(current);
    }else{/* Finalizar */
      if(responses.includes(null)){alert('Responde todas las preguntas');return;}
      calcResult();
    }
  });

  /* 6. Init */
  renderQuestion(0);
});
