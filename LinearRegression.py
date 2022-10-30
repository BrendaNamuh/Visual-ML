from matplotlib import pyplot
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#variables to store mean and standard deviation for each feature
mu = []
std = []

# Normalizes each column 
def normalization(data):
    for clmn in range(data.shape[1]-1):
        data[:,clmn] = ((data[:,clmn] - np.mean(data[:,clmn])) / np.std(data[:,clmn]))
        mu.append(np.mean(data[:,clmn]))
        std.append(np.std(data[:, clmn]))
        

def load_dataset(filename):

    df = pd.read_csv(filename, sep=",", index_col=False)
    df.columns = ["housesize", "rooms", "price"]
    data = np.array(df, dtype=float)
    # It is always advised to scale or normalize your features so that they all lie within the same range
    #normalization(data)
    return data[:,:2], data[:, -1]
   

def plot_data(x,y):
    plt.xlabel('house size')
    plt.ylabel('price')
    plt.plot(x[:,0], y,'bo')
    plt.show()

def plot_cost(J_all, num_epochs):
    plt.xlabel('Epochs')
    plt.ylabel('Cost')
    plt.plot(num_epochs, J_all, 'm', linewidth = "5")
    plt.show()


# Hypothesis
def h(x,thetas):
    return np.matmul(x,thetas)

# Mean Square Error
# x, labels, thetas
def cost(x,y,thetas):
    hypotheses = h(x,thetas) # Recall that the hypotheses is a 1-column array
    
    diff = hypotheses - y
    numerator = diff.T @ diff # Equivalent to np.sum(np.square(diff))
    return numerator/(2*y.shape[0])

# Might make things clearer in gradient function  
def cost_derivative():
    return

def gradient_descent(x,y,thetas, learning_rate, num_epochs):
    nmbr_examples = len(x)
    cost_history= []  
    theta_history = []
    curr_thetas = []

    
    

    for i in range(num_epochs):

        theta_history.append([thetas[0][0],thetas[1][0], thetas[2][0], cost(x,y,thetas)[0][0]])
      
        diff = h(x,thetas) - y

        #Calculate Gradient
        partial_deriv =  (x.T @ diff) /nmbr_examples # Partial derivative w.r.t m 
      
        #Update thetas
        thetas =  thetas - (learning_rate * partial_deriv)
    
    return thetas, cost_history, theta_history


 
def test(theta, x):
    x[0] = (x[0] - mu[0])/std[0]
    x[1] = (x[1] - mu[1])/std[1]

    y = theta[0] + theta[1]*x[0] + theta[2]*x[1]
    print("Price of house: ", y)
    



if __name__ == '__main__':
    x,y = load_dataset('/Users/brenda/Desktop/ML/MLCode/VisualML/datasets/PortlandHousePrices.csv')
    y = np.reshape(y, (y.shape[0], 1)) # goes from shape 46, to 46,1
    x = np.hstack((np.ones((x.shape[0],1)), x)) # Add clmn of ones to beginning of x array
    thetas = np.zeros((x.shape[1],1))

    learning_rate = 0.00000001 # Should usually be 1e-8 # 0.0000000 00001
    num_epochs = 100
    
   
    
    final_thetas, cost_history, theta_history = gradient_descent(x, y, thetas, learning_rate, num_epochs)
    


    df = pd.DataFrame(theta_history, columns = ['b','m1','m2','cost'])
   
    df.to_csv('/Users/brenda/Desktop/ML/MLCode/VisualML/LR_Coefficients.csv',index=False)
    


   

    #--------------Plotting Progress
    
    n_epochs = []
    cost_plot = []
    count = 0

    
    for i in df["cost"]:
        cost_plot.append(i)
        n_epochs.append(count)
        count += 1
        
    
    jplot = np.array(cost_plot)
    n_epochs = np.array(n_epochs)
    plot_cost(jplot, n_epochs)

 






    


