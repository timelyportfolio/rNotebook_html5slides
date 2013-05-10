library(shiny)

shinyServer(function(input, output) {
  
  observe({
    print("hi")
    print(input$slidify)
  })
  
})
