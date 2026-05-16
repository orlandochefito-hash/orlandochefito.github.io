 
    const corpo = document.getElementById('corpoTabela');
    const btnAdd = document.getElementById('btnAdd');
    const btnCalcular = document.getElementById('btnCalcular');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnExportar = document.getElementById('btnExportar');
    const btnReset = document.getElementById('btnReset');
    const resultado = document.getElementById('resultado');
    const textoResultado = document.getElementById('textoResultado');
    const detalhes = document.getElementById('detalhes');
    const cursoInput = document.getElementById('curso');
    const minimoInput = document.getElementById('minimoAprovacao');

    
    const exemplo = [
      {nome:'Prova', peso:50, nota:75},
      {nome:'Trabalho', peso:30, nota:85},
      {nome:'Tarefa', peso:20, nota:90}
    ];

    function criarLinha(item={nome:'',peso:0,nota:0}){
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input class='nome' type='text' value='${escapeHtml(item.nome)}' placeholder='Ex: Prova final' /></td>
        <td><input class='peso' type='number' min='0' step='0.1' value='${item.peso}' /></td>
        <td><input class='nota' type='number' min='0' max='100' step='0.1' value='${item.nota}' /></td>
        <td class='row-actions'>
          <button class='btnRemover ghost' title='Remover'>🗑️</button>
          <button class='btnDuplicar ghost' title='Duplicar'>📄</button>
        </td>
      `;

      
      tr.querySelector('.btnRemover').addEventListener('click', ()=>{ tr.remove(); });
      tr.querySelector('.btnDuplicar').addEventListener('click', ()=>{
        const nome = tr.querySelector('.nome').value || '';
        const peso = parseFloat(tr.querySelector('.peso').value) || 0;
        const nota = parseFloat(tr.querySelector('.nota').value) || 0;
        corpo.appendChild(criarLinha({nome,peso,nota}));
      });

      return tr;
    }

    function escapeHtml(str){
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    function carregarExemplo(){
      corpo.innerHTML='';
      exemplo.forEach(it=>corpo.appendChild(criarLinha(it)));
    }

    function lerLinhas(){
      const linhas = [];
      const trs = corpo.querySelectorAll('tr');
      trs.forEach(tr=>{
        const nome = tr.querySelector('.nome').value.trim();
        const peso = parseFloat(tr.querySelector('.peso').value) || 0;
        const nota = parseFloat(tr.querySelector('.nota').value) || 0;
        if(nome || peso || nota){ linhas.push({nome,peso,nota}); }
      });
      return linhas;
    }

    function calcular(){
      const minAprov = parseFloat(minimoInput.value) || 0;
      const linhas = lerLinhas();
      if(linhas.length===0){ alert('Adicione ao menos uma atividade.'); return; }

      const somaPesos = linhas.reduce((s,it)=>s+Math.max(0,it.peso),0);
   
      let media=0;
      if(somaPesos === 0){
        media = linhas.reduce((s,it)=>s+it.nota,0)/linhas.length;
      } else {
        media = linhas.reduce((s,it)=>s + ((Math.max(0,it.peso)/somaPesos) * it.nota),0);
      }

      const conceito = conceitoPorNota(media);
      const aprovado = media >= minAprov;

      textoResultado.textContent = `${cursoInput.value || 'Disciplina'} — Média final: ${round(media,2)} (${conceito}) — ${aprovado? 'APROVADO':'REPROVADO'}`;

      
      const parts = [];
      parts.push('Detalhes:');
      linhas.forEach(it=>{
        parts.push(`${it.nome || '(sem nome)'} — Peso: ${it.peso} — Nota: ${it.nota}`);
      });
      parts.push(`Soma dos pesos: ${round(somaPesos,2)} (normalização aplicada)`);
      detalhes.innerHTML = parts.join('<br>');

      resultado.style.display = 'block';
    }

    function conceitoPorNota(n){
 
      if(n>=90) return 'A';
      if(n>=80) return 'B';
      if(n>=70) return 'C';
      if(n>=60) return 'D';
      return 'F';
    }

    function round(v,dec=2){ return Math.round(v*Math.pow(10,dec))/Math.pow(10,dec); }

    
    function salvarLocal(){
      const data = {curso:cursoInput.value, minimo: minimoInput.value, linhas: lerLinhas()};
      localStorage.setItem('sistema_notas_v1', JSON.stringify(data));
      alert('Salvo no armazenamento local do navegador.');
    }

    function carregarLocal(){
      const raw = localStorage.getItem('sistema_notas_v1');
      if(!raw) { carregarExemplo(); return; }
      try{
        const obj = JSON.parse(raw);
        cursoInput.value = obj.curso || '';
        minimoInput.value = obj.minimo || minimoInput.value;
        corpo.innerHTML='';
        (obj.linhas || []).forEach(it=>corpo.appendChild(criarLinha(it)));
      }catch(e){ carregarExemplo(); }
    }

    function exportarCSV(){
      const linhas = lerLinhas();
      if(linhas.length===0){ alert('Nada para exportar.'); return; }
      const header = ['Atividade','Peso','Nota'];
      const rows = linhas.map(r => [escapeCsv(r.nome), r.peso, r.nota].join(','));
      const csv = [header.join(',')].concat(rows).join('\n');
      const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = (cursoInput.value||'notas') + '.csv';
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }

    function escapeCsv(str){
      if(str==null) return '';
      str = String(str);
      if(str.includes(',') || str.includes('\"') || str.includes('\n')){
        return '"'+str.replace(/\"/g,'""')+'"';
      }
      return str;
    }

    btnAdd.addEventListener('click', ()=>{ corpo.appendChild(criarLinha()); });
    btnCalcular.addEventListener('click', calcular);
    btnSalvar.addEventListener('click', salvarLocal);
    btnExportar.addEventListener('click', exportarCSV);
    btnReset.addEventListener('click', ()=>{ if(confirm('Limpar tudo e carregar exemplo?')){ localStorage.removeItem('sistema_notas_v1'); carregarExemplo(); resultado.style.display='none'; }});

    
    carregarLocal();

    
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ const tag = document.activeElement.tagName.toLowerCase(); if(['input','select'].includes(tag)) { e.preventDefault(); calcular(); } } });
 