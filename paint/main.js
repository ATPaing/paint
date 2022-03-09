const body = document.querySelector('body')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const pencil = document.getElementById('pencil')
const brush = document.getElementById('brush')
const eraser = document.getElementById('eraser')
const plusSign = document.getElementById('plusSign')
const minusSign = document.getElementById('minusSign')

const colorHolder = document.getElementById('colorHolder')
const color = document.getElementById('color')
const sizeHolder = document.getElementById('sizeHolder')
const stationeryAttributeHolder = document.getElementById('stationeryAttributeHolder')
const numberInput = document.getElementById('numberInput')

let isPencilClicked = false
let isBrushClicked = false
let isEraserClicked = false

let drawingStarted = false
let paintStarted = false
let eraseStarted = false

let stopped = false

let lineWidth = 10

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse = {
    x : null,
    y : null
}

window.addEventListener('mousemove',(e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

// pencil clicked
pencil.addEventListener('click',() => {
    if(!isPencilClicked){

        isPencilClicked = true
        isBrushClicked = false
        isEraserClicked = false

        body.style.setProperty('cursor', 'url(images/pencil-cursor.png) 8 40,auto')
        stationeryAttributeHolder.style.transform = 'scale(1)'
        stationeryAttributeHolder.style.opacity = '1'
        colorHolder.style.opacity  = '0'
        setTimeout(() => {
            colorHolder.style.display  = 'none'
        },500)
        
    }else if(isPencilClicked){

        isPencilClicked = false

        body.style.setProperty('cursor', 'auto')
        stationeryAttributeHolder.style.transform = 'scale(0)'
        stationeryAttributeHolder.style.opacity = '0'
    }
})

// brush clicked
brush.addEventListener('click',() => {
    if(!isBrushClicked){

        isPencilClicked = false
        isBrushClicked = true
        isEraserClicked = false
        
        body.style.setProperty('cursor', 'url(images/paint-brush-cursor.png) 8 53,auto')
        stationeryAttributeHolder.style.transform = 'scale(1)'
        stationeryAttributeHolder.style.opacity = '1'
        colorHolder.style.display  = 'flex'
        setTimeout(() => {
            colorHolder.style.opacity  = '1'
        },150)
    }else if(isBrushClicked){
        isBrushClicked = false
        body.style.setProperty('cursor', 'auto')
        stationeryAttributeHolder.style.transform = 'scale(0)'
        stationeryAttributeHolder.style.opacity = '0'
    }   
})

// eraser clicked
eraser.addEventListener('click',() => {
    if(!isEraserClicked){

        isPencilClicked = false
        isBrushClicked = false
        isEraserClicked = true

        body.style.setProperty('cursor', 'url(images/eraser-cursor.svg) 4 58,auto')
        stationeryAttributeHolder.style.transform = 'scale(1)'
        stationeryAttributeHolder.style.opacity = '1'
        colorHolder.style.opacity  = '0'
        setTimeout(() => {
            colorHolder.style.display  = 'none'
        },500)
    }else if(isEraserClicked){
        isEraserClicked = false
        body.style.setProperty('cursor', 'auto')
        stationeryAttributeHolder.style.transform = 'scale(0)'
        stationeryAttributeHolder.style.opacity = '0'
    }
    
})

// plusSign Clicked
plusSign.addEventListener('click',() => {
    numberInput.value++
    lineWidth = numberInput.value
})

// minusSign Clicked
minusSign.addEventListener('click',() => {
    numberInput.value--
    if(numberInput.value < 0){
        numberInput.value = 0
    }
    lineWidth = numberInput.value
})


// event listener of stationery attr holder

// mouse enter
stationeryAttributeHolder.addEventListener('mouseenter',() => {
    stopped = true
    body.style.setProperty('cursor', 'auto')
})
// mouse leave
stationeryAttributeHolder.addEventListener('mouseleave',() => {
    stopped = false
    if(isPencilClicked){
        body.style.setProperty('cursor', 'url(images/pencil-cursor.png) 8 40,auto')
    }else if(isBrushClicked){
        body.style.setProperty('cursor', 'url(images/paint-brush-cursor.png) 8 53,auto')
    }else if(isEraserClicked){
        body.style.setProperty('cursor', 'url(images/eraser-cursor.svg) 4 58,auto')
    }
})

////////////////////////////////////////////////

// window mouse down
window.addEventListener('mousedown',() => {
    if(isPencilClicked){
        drawingStarted = true
    }
    if(isBrushClicked){
        paintStarted = true
    }
    if(isEraserClicked){
        eraseStarted = true
    }
})

// window mouse up 
window.addEventListener('mouseup',() => {
    drawingStarted = false
    paintStarted = false
    eraseStarted = false
    ctx.beginPath()
})

window.addEventListener('click',() => {
    console.log('working')
    if(drawingStarted){
        draw()
    }
    if(paintStarted){
        paint()
    }
    if(eraseStarted){
        erase()
    }
})

// window mouse move
window.addEventListener('mousemove',() => {
    if(drawingStarted){
        draw()
    }
    if(paintStarted){
        paint()
    }
    if(eraseStarted){
        erase()
    }
})

function draw(){
    if(stopped){
        return
    }
    ctx.lineWidth = numberInput.value
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    ctx.lineTo(mouse.x,mouse.y)
    ctx.stroke()
    ctx.moveTo(mouse.x,mouse.y)
}

function paint(){
    if(stopped){
        return
    }
    ctx.lineWidth = numberInput.value
    ctx.lineCap = "round"
    ctx.strokeStyle = color.value

    ctx.lineTo(mouse.x,mouse.y)
    ctx.stroke()
    ctx.moveTo(mouse.x,mouse.y)
}


function erase(){
    if(stopped){
        return
    }
    ctx.lineWidth = numberInput.value
    ctx.lineCap = "round"
    ctx.strokeStyle = 'white'

    ctx.lineTo(mouse.x,mouse.y)
    ctx.stroke()
    ctx.moveTo(mouse.x,mouse.y)
}
