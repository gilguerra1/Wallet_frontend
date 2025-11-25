const BASE = (location.hostname === 'localhost' ? 'http://localhost:8000' : '') + '/api/v1'

// Known currencies based on migrations
const CURRENCIES = [
  { id: 1, code: 'BTC' },
  { id: 2, code: 'ETH' },
  { id: 3, code: 'SOL' },
  { id: 4, code: 'USD' },
  { id: 5, code: 'BRL' },
]

function $(id){return document.getElementById(id)}

function init() {
  // wire up currency selectors
  ['deposit-currency','withdraw-currency','transfer-currency','convert-source','convert-target'].forEach(id => {
    const sel = $(id)
    CURRENCIES.forEach(c => {
      const opt = document.createElement('option')
      opt.value = c.id
      opt.textContent = `${c.id} - ${c.code}`
      sel.appendChild(opt)
    })
  })

  // buttons
  $('btn-create-wallet').addEventListener('click', createWallet)
  $('btn-get-wallet').addEventListener('click', getWallet)
  $('btn-get-balances').addEventListener('click', getBalances)

  $('btn-deposit').addEventListener('click', createDeposit)
  $('btn-withdraw').addEventListener('click', createWithdraw)
  $('btn-transfer').addEventListener('click', createTransfer)
  $('btn-convert').addEventListener('click', createConversion)
}

async function createWallet(){
  clearResults()
  setResult('create-result', 'Criando...')
  try{
    const res = await fetch(`${BASE}/wallets`,{ method: 'POST' })
    const body = await res.json()
    if (!res.ok) throw body
    setResult('create-result', JSON.stringify(body, null, 2))
    // autopopulate address and private key so user can use actions
    $('wallet-address').value = body.wallet_address || ''
    $('wallet-private-key').value = body.private_key || ''
  }catch(err){
    setResult('create-result', 'Erro: '+JSON.stringify(err))
  }
}

async function getWallet(){
  const address = $('wallet-address').value.trim()
  if(!address) return setResult('wallet-info','Informe o endereço da carteira primeiro')
  setResult('wallet-info','Buscando...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}`)
    const body = await res.json()
    if (!res.ok) throw body
    setResult('wallet-info', JSON.stringify(body, null, 2))
  }catch(err){
    setResult('wallet-info','Erro: '+JSON.stringify(err))
  }
}

async function getBalances(){
  const address = $('wallet-address').value.trim()
  if(!address) return setResult('balances-info','Informe o endereço da carteira primeiro')
  setResult('balances-info','Buscando saldos...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}/balance`)
    const body = await res.json()
    if (!res.ok) throw body
    // pretty print
    setResult('balances-info', JSON.stringify(body, null, 2))
  }catch(err){
    setResult('balances-info','Erro: '+JSON.stringify(err))
  }
}

async function createDeposit(){
  const address = $('wallet-address').value.trim()
  const private_key = $('wallet-private-key').value.trim()
  const currency_id = parseInt($('deposit-currency').value)
  const value = parseFloat($('deposit-value').value)
  if(!address) return setResult('deposit-result','Informe a carteira')
  setResult('deposit-result','Enviando depósito...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}/deposits`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ currency_id, value, private_key })
    })
    const body = await res.json()
    if(!res.ok) throw body
    setResult('deposit-result', JSON.stringify(body, null, 2))
  }catch(err){ setResult('deposit-result','Erro: '+JSON.stringify(err)) }
}

async function createWithdraw(){
  const address = $('wallet-address').value.trim()
  const private_key = $('wallet-private-key').value.trim()
  const currency_id = parseInt($('withdraw-currency').value)
  const value = parseFloat($('withdraw-value').value)
  if(!address) return setResult('withdraw-result','Informe a carteira')
  setResult('withdraw-result','Enviando saque...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}/withdrawals`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ currency_id, value, private_key })
    })
    const body = await res.json()
    if(!res.ok) throw body
    setResult('withdraw-result', JSON.stringify(body, null, 2))
  }catch(err){ setResult('withdraw-result','Erro: '+JSON.stringify(err)) }
}

async function createTransfer(){
  const address = $('wallet-address').value.trim()
  const private_key = $('wallet-private-key').value.trim()
  const wallet_target_address = $('transfer-target').value.trim()
  const currency_id = parseInt($('transfer-currency').value)
  const value = parseFloat($('transfer-value').value)
  if(!address) return setResult('transfer-result','Informe a carteira origem')
  setResult('transfer-result','Processando transferência...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}/transfer`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ wallet_target_address, currency_id, value, private_key })
    })
    const body = await res.json()
    if(!res.ok) throw body
    setResult('transfer-result', JSON.stringify(body, null, 2))
  }catch(err){ setResult('transfer-result','Erro: '+JSON.stringify(err)) }
}

async function createConversion(){
  const address = $('wallet-address').value.trim()
  const private_key = $('wallet-private-key').value.trim()
  const source_currency_id = parseInt($('convert-source').value)
  const target_currency_id = parseInt($('convert-target').value)
  const source_value = parseFloat($('convert-value').value)
  if(!address) return setResult('convert-result','Informe a carteira')
  setResult('convert-result','Processando conversão...')
  try{
    const res = await fetch(`${BASE}/wallets/${encodeURIComponent(address)}/conversions`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ source_currency_id, target_currency_id, source_value, private_key })
    })
    const body = await res.json()
    if(!res.ok) throw body
    setResult('convert-result', JSON.stringify(body, null, 2))
  }catch(err){ setResult('convert-result','Erro: '+JSON.stringify(err)) }
}

function setResult(id, text){
  const el = $(id)
  if(!el) return console.log('missing', id, text)
  el.textContent = typeof text === 'string' ? text : JSON.stringify(text, null, 2)
}

function clearResults(){
  ['create-result','wallet-info','balances-info','deposit-result','withdraw-result','transfer-result','convert-result'].forEach(id=>{ const el=$(id); if(el) el.textContent = '' })
}

window.addEventListener('DOMContentLoaded', init)
