/* ============================================
   AGRO FORTE — FUTURO SUSTENTÁVEL
   script.js — Interatividade Completa
   ============================================ */
 
'use strict';
 
/* ================================================
   1. NAVBAR — scroll effect + mobile menu + active link
   ================================================ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a');
 
// Scroll: adiciona classe ao navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
  toggleBackToTop();
}, { passive: true });
 
// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
 
// Fecha menu ao clicar num link
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
 
// Destaque do link ativo conforme seção visível
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
 
/* ================================================
   2. BACK TO TOP BUTTON
   ================================================ */
const backToTopBtn = document.getElementById('back-to-top');
 
function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}
 
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
 
/* ================================================
   3. INTERSECTION OBSERVER — reveal on scroll
   ================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Anima barras de progresso (seção ambiente)
        const fill = entry.target.querySelector('.acard-fill');
        if (fill) {
          fill.style.width = fill.dataset.width + '%';
        }
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ================================================
   4. CONTADORES ANIMADOS
   ================================================ */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
 
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = 16;
  const steps = duration / step;
  let current = 0;
 
  const timer = setInterval(() => {
    current += target / steps;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, step);
}
 
/* ================================================
   5. CHART.JS — Gráfico de crescimento agrícola
   ================================================ */
const chartObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    renderChart();
    chartObserver.disconnect();
  }
}, { threshold: 0.3 });
 
chartObserver.observe(document.getElementById('agroChart'));
 
function renderChart() {
  const ctx = document.getElementById('agroChart').getContext('2d');
 
  // Gradientes
  const gradProd = ctx.createLinearGradient(0, 0, 0, 400);
  gradProd.addColorStop(0, 'rgba(46,125,50,.7)');
  gradProd.addColorStop(1, 'rgba(46,125,50,.05)');
 
  const gradSust = ctx.createLinearGradient(0, 0, 0, 400);
  gradSust.addColorStop(0, 'rgba(102,187,106,.7)');
  gradSust.addColorStop(1, 'rgba(102,187,106,.05)');
 
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Crescimento da Produção Agrícola (%)',
          data: [100, 108, 118, 130, 144, 162],
          borderColor: '#2E7D32',
          backgroundColor: gradProd,
          borderWidth: 3,
          fill: true,
          tension: 0.45,
          pointBackgroundColor: '#2E7D32',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
        },
        {
          label: 'Índice de Sustentabilidade (%)',
          data: [42, 52, 60, 68, 75, 83],
          borderColor: '#66BB6A',
          backgroundColor: gradSust,
          borderWidth: 3,
          fill: true,
          tension: 0.45,
          pointBackgroundColor: '#66BB6A',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1800, easing: 'easeInOutQuart' },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'DM Sans', size: 13 },
            usePointStyle: true,
            padding: 20,
          }
        },
        tooltip: {
          backgroundColor: '#1B5E20',
          titleFont: { family: 'DM Sans', size: 13 },
          bodyFont: { family: 'DM Sans', size: 12 },
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,.05)' },
          ticks: { font: { family: 'DM Sans', size: 13 }, color: '#555' }
        },
        y: {
          grid: { color: 'rgba(0,0,0,.05)' },
          ticks: {
            font: { family: 'DM Sans', size: 12 },
            color: '#555',
            callback: val => val + '%'
          },
          beginAtZero: false,
          suggestedMin: 30,
        }
      }
    }
  });
}
 
/* ================================================
   6. QUIZ INTERATIVO
   ================================================ */
const quizData = [
  {
    question: 'Qual prática agrícola ajuda a economizar água na irrigação?',
    options: [
      'Irrigação por inundação total',
      'Gotejamento de precisão por sensores',
      'Mangueira convencional sem controle',
      'Chuva artificial constante'
    ],
    correct: 1,
    explanation: 'O gotejamento inteligente economiza até 50% de água comparado à irrigação tradicional.'
  },
  {
    question: 'O que é agricultura de precisão?',
    options: [
      'Usar apenas adubos orgânicos',
      'Plantar em linhas perfeitamente retas',
      'Usar GPS, drones e dados para aplicar insumos no lugar certo',
      'Colher apenas à noite para evitar evaporação'
    ],
    correct: 2,
    explanation: 'Agricultura de precisão combina tecnologia e dados para otimizar cada metro da lavoura.'
  },
  {
    question: 'Qual é um benefício do plantio direto para o meio ambiente?',
    options: [
      'Elimina todos os insetos da lavoura',
      'Reduz erosão do solo e sequestra carbono',
      'Aumenta o uso de agrotóxicos',
      'Impede o crescimento de plantas daninhas totalmente'
    ],
    correct: 1,
    explanation: 'O plantio direto mantém o solo protegido, reduz erosão em até 90% e absorve CO₂ atmosférico.'
  },
  {
    question: 'Como os drones contribuem para a sustentabilidade agrícola?',
    options: [
      'Apenas fazem fotos bonitas das lavouras',
      'Substituem todos os trabalhadores rurais',
      'Realizam pulverização precisa, reduzindo uso de defensivos em até 30%',
      'Aumentam a temperatura do solo para acelerar o crescimento'
    ],
    correct: 2,
    explanation: 'Drones aplicam defensivos somente onde necessário, reduzindo custos e impacto ambiental.'
  },
  {
    question: 'O que é o sistema de Integração Lavoura-Pecuária-Floresta (ILPF)?',
    options: [
      'Separar completamente as áreas de plantio, gado e árvores',
      'Combinar produção vegetal, animal e florestal na mesma área de forma sustentável',
      'Substituir a pecuária por reflorestamento obrigatório',
      'Plantar somente frutas exóticas com animais domésticos'
    ],
    correct: 1,
    explanation: 'O ILPF é um sistema que integra atividades agropecuárias e florestais, elevando produtividade e reduzindo impacto ambiental.'
  }
];
 
let quizState = { current: 0, score: 0, answered: false };
 
function initQuiz() {
  quizState = { current: 0, score: 0, answered: false };
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-question-area').style.display = '';
  renderQuestion();
}
 
function renderQuestion() {
  const q = quizData[quizState.current];
  const total = quizData.length;
  const pct = (quizState.current / total) * 100;
 
  document.getElementById('quiz-progress').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `Pergunta ${quizState.current + 1} de ${total}`;
  document.getElementById('quiz-score-live').textContent = `Acertos: ${quizState.score}`;
  document.getElementById('quiz-question').textContent = q.question;
 
  const optContainer = document.getElementById('quiz-options');
  optContainer.innerHTML = '';
  quizState.answered = false;
 
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i));
    optContainer.appendChild(btn);
  });
}
 
function handleAnswer(selected) {
  if (quizState.answered) return;
  quizState.answered = true;
 
  const q = quizData[quizState.current];
  const buttons = document.querySelectorAll('.quiz-option');
 
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct)  btn.classList.add('correct');
    if (i === selected && selected !== q.correct) btn.classList.add('wrong');
  });
 
  if (selected === q.correct) quizState.score++;
 
  document.getElementById('quiz-score-live').textContent = `Acertos: ${quizState.score}`;
 
  // Avança após 1.4s
  setTimeout(() => {
    quizState.current++;
    if (quizState.current < quizData.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 1400);
}
 
function showResult() {
  document.getElementById('quiz-question-area').style.display = 'none';
  document.getElementById('quiz-result').classList.remove('hidden');
  document.getElementById('quiz-progress').style.width = '100%';
 
  const s = quizState.score;
  document.getElementById('result-score-num').textContent = s;
 
  let icon, title, message;
  if (s === 5) {
    icon = '🏆'; title = 'Mestre da Sustentabilidade!';
    message = 'Perfeito! Você domina os conceitos do agronegócio sustentável. O planeta agradece!';
  } else if (s >= 4) {
    icon = '🌟'; title = 'Especialista Verde!';
    message = 'Excelente! Você tem um ótimo conhecimento sobre práticas sustentáveis no campo.';
  } else if (s >= 3) {
    icon = '🌱'; title = 'Estudante Consciente!';
    message = 'Muito bem! Você está no caminho certo. Continue aprendendo sobre sustentabilidade agrícola.';
  } else if (s >= 2) {
    icon = '🌿'; title = 'Aprendiz do Campo!';
    message = 'Bom começo! Explore mais o conteúdo do site para aprender sobre o agro sustentável.';
  } else {
    icon = '🌾'; title = 'Semente a Germinar!';
    message = 'Não desanime! Leia o conteúdo acima e tente novamente — aprender é o primeiro passo.';
  }
 
  document.getElementById('result-icon').textContent  = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-message').textContent = message;
}
 
document.getElementById('quiz-restart').addEventListener('click', initQuiz);
initQuiz();
 
/* ================================================
   7. CURIOSIDADES — cards expansíveis (accordion)
   ================================================ */
document.querySelectorAll('.curiosity-card').forEach(card => {
  const header = card.querySelector('.cur-header');
  header.addEventListener('click', () => {
    // Fecha todos os outros
    document.querySelectorAll('.curiosity-card').forEach(other => {
      if (other !== card) other.classList.remove('open');
    });
    card.classList.toggle('open');
  });
});
 
/* ================================================
   8. PARALLAX SUAVE no Hero
   ================================================ */
const heroSection = document.getElementById('hero');
const heroVisual  = document.querySelector('.hero-visual');
 
window.addEventListener('scroll', () => {
  if (!heroSection || !heroVisual) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.12}px)`;
  }
}, { passive: true });
 
/* ================================================
   9. SMOOTH SCROLL para links internos
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // altura do navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
 
/* ================================================
   10. EFEITO DE ENTRADA NAS HERO STATS com stagger
   ================================================ */
window.addEventListener('DOMContentLoaded', () => {
  const hstats = document.querySelectorAll('.hstat, .hstat-divider');
  hstats.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 900 + i * 100);
  });
 
  // Marca o menu como scrolled se a página recarregar com scroll > 0
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  updateActiveLink();
});
 
/* ================================================
   11. GALERIA — destaque ao hover com teclado
   ================================================ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      item.querySelector('.gallery-overlay').style.opacity = '1';
      item.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
    }
  });
});
 
/* ================================================
   12. Observador especial para Timeline
   ================================================ */
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
 
document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));
 
/* ================================================
   FIM DO SCRIPT
   ================================================ */
console.log('%c🌿 AgroFuturo — Produzir mais, preservar melhor.', 
  'color:#2E7D32; font-size:14px; font-weight:bold; padding:6px;');