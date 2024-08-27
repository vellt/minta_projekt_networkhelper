using NetworkHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace TanulokWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        string url = "http://localhost:3000/tanulok";
        public MainWindow()
        {
            InitializeComponent();
            LoadStudents();
        }

        private void LoadStudents()
        {
            TanulokDataGrid.ItemsSource = Backend.GET(url)
                .Send()
                .ValueAt(2)
                .As<List<Tanulo>>();
        }

        private void CreateButton_Click(object sender, RoutedEventArgs e)
        {
            Tanulo uj= new Tanulo
            {
                nev = NevTextBox.Text,
                osztaly = OsztalyTextBox.Text,
                szuletesi_datum = DatumTextBox.Text
            };
            Response response= Backend.POST(url).Body(uj).Send();
            MessageBox.Show(response.ValueAt(0).As<string>());
        }

        private void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            if (TanulokDataGrid.SelectedItem is Tanulo)
            {
                Tanulo selectedStudent = (Tanulo)TanulokDataGrid.SelectedItem;
                Tanulo modositott = new Tanulo
                {
                    id=selectedStudent.id,
                    nev = NevTextBox.Text,
                    osztaly = OsztalyTextBox.Text,
                    szuletesi_datum = DatumTextBox.Text
                };
                Response response = Backend.PUT(url + $"/{selectedStudent.id}")
                    .Body(modositott)
                    .Send();
                MessageBox.Show(response.ValueAt(0).As<string>());
                LoadStudents();
            }
        }

        private void Delete_Button_Click(object sender, RoutedEventArgs e)
        {
            if(TanulokDataGrid.SelectedItem is Tanulo)
            {
                Tanulo selectedStudent = (Tanulo)TanulokDataGrid.SelectedItem;
                Response r = Backend.DELETE(url + $"/{selectedStudent.id}").Send();
                MessageBox.Show(r.ValueAt(0).As<string>());
                LoadStudents();
            }
        }

        private void Refresh_Button_Click(object sender, RoutedEventArgs e)
        {
            LoadStudents();
        }

        private void StudentsDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (TanulokDataGrid.SelectedItem is Tanulo)
            {
                Tanulo selectedStudent = (Tanulo)TanulokDataGrid.SelectedItem;
                NevTextBox.Text = selectedStudent.nev;
                OsztalyTextBox.Text = selectedStudent.osztaly;
                DatumTextBox.Text = selectedStudent.szuletesi_datum;
            }
        }

        private void Clear_Button_Click(object sender, RoutedEventArgs e)
        {
            TanulokDataGrid.SelectedIndex = -1;
            NevTextBox.Text = "";
            OsztalyTextBox.Text = "";
            DatumTextBox.Text = "";
        }
    }
}
