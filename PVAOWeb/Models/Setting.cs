//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PVAOWeb.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Setting
    {
        public int Id { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public string ServerName { get; set; }
        public int SMTPPort { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool EnableSSL { get; set; }
        public int MaxSignOnAttempts { get; set; }
        public int ExpiresIn { get; set; }
        public int MinPasswordLength { get; set; }
        public int MinSpecialCharacters { get; set; }
        public int EnforcePasswordHistory { get; set; }
        public int ActivationLinkExpiresIn { get; set; }
        public string BaseUrl { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime DateCreated { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
    }
}
