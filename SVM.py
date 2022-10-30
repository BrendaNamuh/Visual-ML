import numpy as np
import pandas as pd

class SVM:

    def __init__ (self, learning_rate = 0.001,lmbda=0.001, n_iterations=1000 ):
        self.lr = learning_rate
        self.lmbda = lmbda
        self.n_iterations = n_iterations
        self.w = None
        self.b = None
        self.history = []
        

    def predict(self, X):
        linear_output = np.dot(self.w*X) -self.b #(self.w * X) - self.b
        return np.sign(linear_output)
    

    def fit (self, X, y):
        y_label = np.where(y<=0,-1,1)
        n_samples, n_features = X.shape

        self.w = np.zeros(n_features)
        self.b = 0
        sum = 0
        self.history.append([self.w[0], self.w[1], self.b]) 
        
        for _ in range(self.n_iterations):
            sum = 0
            for i,x in enumerate(X):
                sum += max(0,(1 - (y_label[i] * (np.dot(self.w,x)-self.b))))
                #print(x)
                correct_classification = y_label[i] * (np.dot(self.w,x)-self.b) >= 1

                if correct_classification:
                    self.w -= self.lr * (2* self.lmbda * self.w)
                    
                else:
                    self.w -= self.lr * (2* self.lmbda * self.w  - np.dot(x,y_label[i])) 
                    self.b -=self.lr*y_label[i]
                

       
          
            cost = (sum/len(X))
            self.history.append([self.w[0], self.w[1], self.b,cost]) 




if __name__ == "__main__":
    # Load data 
    df = pd.read_csv("/Users/brenda/Desktop/ML/MLCode/VisualML/datasets/classification.csv", index_col=False)
    df.columns  = ["age","amount","sucess"]
    data = np.array(df, dtype=float)

    
    classifier = SVM()
    classifier.fit(data[:,:2], data[:,-1])
    
    data = pd.DataFrame(classifier.history, columns = ['w1','w2','b','cost'])
    
   
    data.to_csv('/Users/brenda/Desktop/ML/MLCode/VisualML/SVM_Coefficients.csv',index=False)
    
    