using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DatabaseContext : DbContext
    {
        //if you are going to doing a migration from here, It is mandatory to add default constructor
        public DatabaseContext()
        {
        }
        //parameterized constructor is mandatory, if you are going to setup the connectionstring from the startup class
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("data source=WIN-0LBNR4UGTQ9\\SQL2008; initial catalog=AngularCRUD; integrated security=SSPI; MultipleActiveResultSets=True;");
            }
            base.OnConfiguring(optionsBuilder);
        }
    }
}
