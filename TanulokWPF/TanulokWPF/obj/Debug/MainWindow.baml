   M S B A M L   `   `   `  ����E  ATanulokWPF, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'clr-namespace:TanulokWPF
TanulokWPF  5   	       TanulokWPF.MainWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   *localclr-namespace:TanulokWPF     5   	     � Title$  
MainWindow��5   	   $	��450��6   $	��800��6)   .��5	      � $��10q�6    � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   ��  �� Orientation$ 
Horizontal=�6   $��Right=�6.   $��0,0,0,10q�6J   .+�5      �� -   5        $��Új Tanuló��5      $	��100��6)   $��5q�65   6@   �� 5      -   5        $��Módosítás��5      $	��100��6)   $��5q�65   6@   �� 5      -   5        $��Törlés��5      $	��100��6&   $��5q�62   6=   �� 5      -   5        $��Frissítés��5      $	��100��6)   $��5q�65   6@   5      &   System.Windows.Controls.DataGrid  5   
   -   5          Name$ TanulokDataGrid��5      $��1��6,      AutoGenerateColumns .     CanUserAddRows .     
IsReadOnly .    Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$ ID��6%   	   Width5  /System.Windows.Controls.DataGridLengthConverter$	 50 6H   1  +System.Windows.Controls.DataGridBoundColumn
   Binding
 61   �� *id+6H     5      $
 Név��6%   $		 200 6J   
 62   �� *nev+6J     5      $ Osztály��6%   $		 100 6R   
 66   �� *	osztaly+6R     5      $ Születési Dátum��6%   $		 150 6b   
 6>   �� *szuletesi_datum+6b   5       �� 5#   
   $��2��6   $��Center=�6"   $ 
Horizontal=�6?   $��0,10,0,0q�6X   .+�5$      �� $��Név:��6   $��Center=�6#   �� 5%      -   5         ��Name$ 
NevTextBox��5%      $	��150��6*   $��5q�66   �� 5&      $��	Osztály:��6   $��Center=�6'   �� 5'      -   5        $ OsztalyTextBox��5'      $	��100��6.   $��5q�6:   �� 5(      $��Születési Dátum:��6   $��Center=�6/   �� 5)      -   5        $ DatumTextBox��5)      $	��150��6,   $��5q�68   �� 5*      -	   5        $��Adatok törlése��5*      $	��100��6.   $��5q�6:   6E   5+      5,      5-      