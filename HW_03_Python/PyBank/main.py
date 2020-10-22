# Import Modules
import os
import csv

# Path for CSV file
csvpath = os.path.join('Resources','budget_data.csv')

# Variables
total_months = 0
total_revenue =0
changes =[]
date_count = []
greatest_inc = 0
greatest_inc_month = 0
greatest_dec = 0
greatest_dec_month = 0

# Open CSV File
with open(csvpath, newline = '') as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ',')
    next(csvreader, None)
    row = next(csvreader)

    # Calculate the total number of months and total revenue
    previous_profit = int(row[1])
    total_months = total_months + 1
    total_revenue = total_revenue + int(row[1])
    greatest_inc = int(row[1])
    greatest_inc_month = row[0]

    for row in csvreader:
 
        total_months = total_months + 1
        total_revenue = total_revenue + int(row[1])

        # Calculate change from this month to previous months
        change = int(row[1]) - previous_profit
        changes.append(change)
        previous_profit = int(row[1])
        date_count.append(row[0])
        
        #calculating the greatest increase
        if int(row[1]) > greatest_inc:
            greatest_inc = int(row[1])
            greatest_inc_month = row[0]
            
        #calculating the greatest decrease
        if int(row[1]) < greatest_dec:
            greatest_dec = int(row[1])
            greatest_dec_month = row[0]  
      
    # Calculate the average and date
    average_change = round(sum(changes)/len(changes),2)
    high = max(changes)
    low = min(changes)

    # Print all values
    print("Financial Analysis")
    print("------------------------")
    print("Total Months: " + str(total_months))
    print("Total Amount: $" + str(total_revenue))
    print(f'Average Change: $ {average_change}')
    print("Greatest Increase in Profit: " + str(greatest_inc_month), "($", max(changes),")")
    print("Greatest Decrease in Profit: " + str(greatest_dec_month), "($", min(changes),")")

    # Write output.txt file
    txt_output = open("output.txt","w")
    txt_output.write("Financial Analysis") 
    txt_output.write('\n' + "--------------------------") 
    txt_output.write('\n' + "Total Months: " + str(total_months)) 
    txt_output.write('\n' + "Total Amount: $" + str(total_revenue)) 
    txt_output.write('\n' + "Average Change: $" + str(average_change)) 
    txt_output.write('\n' + "Greatest Increase in Profit: "+ greatest_inc_month) 
    txt_output.write('($' + str(high) + ')')
    txt_output.write('\n' +'Greatest Decrease in Profit: ' + greatest_dec_month) 
    txt_output.write('($' + str(low) + ')')
    